const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));

const publicSchema = readJson("public/funding-readiness-helper.openapi.json");
const builderSchema = readJson("builder/funding-readiness-helper/openapi.json");
const request = readJson("tests/payloads/submit-scorecard.request.json");
const response = readJson("tests/payloads/submit-scorecard.response.json");

test("public and Builder contracts require the deployed applicant fields", () => {
  for (const schema of [publicSchema, builderSchema]) {
    const operation = schema.paths["/api/score"].post;
    assert.equal(operation.operationId, "submitScorecard");
    assert.deepEqual(
      schema.components.schemas.ScorecardSubmission.required,
      ["scorecard", "applicantEmail", "applicantPhone", "consent"]
    );
    assert.equal(
      operation.requestBody.content["application/json"].schema.$ref,
      "#/components/schemas/ScorecardSubmission"
    );
  }
});

test("request fixture includes all required contact and consent values", () => {
  const required = publicSchema.components.schemas.ScorecardSubmission.required;
  assert.deepEqual(Object.keys(request), required);
  assert.match(request.applicantEmail, /^[^@]+@[^@]+$/);
  assert.equal(typeof request.applicantPhone, "string");
  assert.equal(request.consent, true);
});

test("successful response exposes publicResult and never the legacy result key", () => {
  const responseSchema = publicSchema.components.schemas.ScorecardResponse;
  const documentedExample =
    publicSchema.paths["/api/score"].post.responses["200"].content[
      "application/json"
    ].example;

  assert.deepEqual(responseSchema.required, ["publicResult"]);
  assert.ok(response.publicResult);
  assert.ok(documentedExample.publicResult);
  assert.equal("result" in response, false);
  assert.equal("result" in documentedExample, false);
});

test("Builder schema stays equivalent to the public schema", () => {
  assert.deepEqual(builderSchema, publicSchema);
});
