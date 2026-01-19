# Agent Management – Mock Responses

These files are mock JSON responses generated from the OpenAPI paths you provided.
They follow the wrapper pattern:

- Success: `{ "status": "success", "data": ... }`
- Errors: schema-based objects (InvalidRequest / UnauthorizedResponse / InternalServerError)

## Folder

- `mock/agent-management/` (this zip root)
- `requests/` contains example request payloads aligned with the request schemas.

## Notes

- Mock response payloads now align to `public/mock/schemas/responses` (field names and shapes).
  If additional schema references are introduced, update the mocks accordingly.
