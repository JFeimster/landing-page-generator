# Funding Readiness Helper Builder package

Use `openapi.json` as the GPT Action schema. Before importing it, replace
`YOUR_PUBLIC_ACTION_HOST` with the public host configured for the deployed score
endpoint.

The `submitScorecard` operation must send all four required top-level values:

- `scorecard`
- `applicantEmail`
- `applicantPhone`
- `consent`

Only submit after the applicant supplies the contact values and explicitly
confirms consent. Read the successful action output from `publicResult`. Do not
request, infer, or expose internal implementation data.

The checked-in examples use reserved, non-deliverable contact values and contain
no real applicant information.
