# Security Spec for Hierarchical Digital Signatures

## Data Invariants
1. A signature cannot exist without a valid document (`expediente`) ID.
2. A signature must belong to an authorized user role for that specific workflow step.
3. Signatures are immutable once created (status: signed).
4. Workflow order must be strictly respected (e.g., Parecer -> Despacho -> Assinatura).

## The "Dirty Dozen" Payloads (for signatures)
1. Sign document with invalid role.
2. Sign document with invalid status.
3. Sign document twice.
4. Sign document out of sequence (e.g., signing without a previous required signature).
5. Inject ghost field into signature document.
6. Sign with invalid userId.
7. Sign with userId not matching `request.auth.uid`.
8. Sign a document that doesn't exist.
9. Attempt to update a signed signature.
10. Attempt to delete a signature.
11. Sign with an invalid signatureType.
12. Attempt to sign document with junk ID.
