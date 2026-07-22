# Frontend Data Architecture

This document describes the structure and usage of the frontend API and state layers. The data architecture is completely decoupled from the UI to ensure maximum scalability.

## 1. Type System (`src/types/models.ts` & `src/types/api.ts`)
We use a centralized TypeScript system mirroring the backend schema exactly. 
- **Rule**: Do not define interfaces ad-hoc inside UI components. Always import from `@/types/models`.
- **API Wrappers**: `PaginatedResponse<T>` and `ApiResponse<T>` handle the standard backend payload formats.

## 2. API Configuration (`src/config/api.ts`)
- The base URL is controlled by `NEXT_PUBLIC_API_URL` (falling back to local `http://localhost:8080/api`).
- **Axios Client (`src/lib/axios.ts`)**: We have implemented `axios-retry`. Safe (idempotent GET) requests will automatically retry up to 3 times on network failure or 500 errors.

## 3. Error Normalization (`src/utils/errors.ts`)
The `normalizeApiError` function catches raw Axios errors and returns a clean `ApiError` object. 
- The UI should *never* read `error.response.data` directly. Always use the normalized object to extract messages safely.

## 4. Service Layer (`src/services/`)
We use a factory pattern (`base.service.ts`) to generate highly typed CRUD services dynamically.
- `AssetService.getAll(pagination, sorting, filters)` automatically handles query string serialization.
- For unique endpoints, we manually implement them (e.g., `AIService.investigate`).

## 5. Usage in Components (Hooks)
Do not call services directly inside `useEffect` logic. Instead, use the `useApi` wrapper to get standard state tracking:
```tsx
const { execute, data, isLoading, error } = useApi(AssetService.getAll);

useEffect(() => {
  execute({ limit: 10, offset: 0 });
}, [execute]);
```

## 6. Global State (`src/components/providers/GlobalStateProvider.tsx`)
A React Context manages lightweight global state:
- `isAuthenticated` (Future Firebase Auth injection point)
- `selectedAssetId` (Used for contextual layout rail)
- `isGlobalLoading`
