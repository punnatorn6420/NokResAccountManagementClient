# Agent Management – Mock Responses

These files are mock JSON responses generated from the OpenAPI paths you provided.
They follow the wrapper pattern:

- Success: `{ "status": "success", "data": ... }`
- Errors: schema-based objects (InvalidRequest / UnauthorizedResponse / InternalServerError)

## Folder
- `mock/agent-management/` (this zip root)

## Notes
- Some component schemas are referenced via `$ref` to external JSON files not included in the snippet.
  Therefore, object fields inside `AgentProfileResponse`, `ContactEmailResponse`, `ResAccountResponse`,
  `CredentialResponse`, and `ResetPasswordLogResponse` are reasonable placeholders for UI development.
  When you provide the exact referenced schema files, we can update these mocks to match 100% field-by-field.
