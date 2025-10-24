# Exercise 4 Solution: Data Fetching Dashboard

## Implementation Overview

This solution implements a **sales leads dashboard** with:

- ✅ Data fetching from JSONPlaceholder API
- ✅ Responsive table display using shadcn/ui
- ✅ Client-side sorting (by name, email, company)
- ✅ Client-side filtering with debounced search (300ms)
- ✅ Pagination (5 items per page)
- ✅ Loading states with skeleton UI
- ✅ TypeScript type safety
- ✅ Keyboard accessibility

## Architecture

### File Structure

```
exercise4/
├── components/
│   ├── LeadsTable.tsx          # Main dashboard component
│   ├── LeadsTableWrapper.tsx   # Table structure wrapper
│   ├── LeadsTablePagination.tsx # Pagination logic & UI
│   └── LeadsSkeleton.tsx       # Loading skeleton for table
├── hooks/
│   └── useLeads.ts             # Data fetching and state management
├── __tests__/
│   └── useLeads.test.tsx       # Unit tests
├── types.ts                    # TypeScript interfaces
├── page.tsx                    # Exercise page
├── solution.md                 # This file
└── README.md                   # Exercise instructions
```

## Key Features

### 1. **Data Fetching**

**API**: [JSONPlaceholder Users](https://jsonplaceholder.typicode.com/users)

```typescript
const fetchLeads = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch leads: ${response.status}`)
  }
  const data = await response.json()
  const transformedLeads = transformApiData(data)
  setLeads(transformedLeads)
}
```

**Why JSONPlaceholder?**

- Free fake public API
- No authentication required
- Perfect structure for sales leads (users have name, email, company, phone, website)

**Data Transformation**:

```typescript
const transformApiData = (users: ApiUser[]): Lead[] => {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company.name, // Flattened nested structure
    phone: user.phone,
    website: user.website,
  }))
}
```

### 2. **Responsive Table Display**

**Using shadcn/ui Table components**:

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      ...
    </TableRow>
  </TableHeader>
  <TableBody>
    {leads.map((lead) => (
      <TableRow key={lead.id}>
        <TableCell>{lead.name}</TableCell>
        <TableCell>{lead.email}</TableCell>
        ...
      </TableRow>
    ))}
  </TableBody>
</Table>
```

**Responsive design**:

- Horizontal scrolling on mobile (`overflow-auto` in Table component)
- Readable font sizes
- Hover states for better UX
- Touch-friendly row height

### 3. **Client-Side Sorting**

**Implementation**:

```typescript
const handleSort = useCallback((field: SortField) => {
  setSortConfig((prevConfig) => {
    if (prevConfig.field === field) {
      // Toggle direction if clicking same field
      return {
        field,
        direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
      }
    }
    return { field, direction: 'asc' }
  })
}, [])
```

**Features**:

- Click column header to sort
- Click again to reverse direction
- Visual indicators (↑/↓ arrows)
- Keyboard accessible (Enter/Space to sort)
- ARIA attributes for screen readers

**Performance**: Uses `useMemo` to avoid re-sorting on every render

### 4. **Client-Side Filtering**

**Search implementation**:

```typescript
const filteredLeads = leads.filter(
  (lead) =>
    lead.name.toLowerCase().includes(query) ||
    lead.email.toLowerCase().includes(query) ||
    lead.company.toLowerCase().includes(query)
)
```

**Features**:

- Case-insensitive search
- Searches across name, email, and company fields
- **Debounced by 300ms** to avoid excessive re-renders
- Automatically resets to page 1 when searching
- Shows "no results" message when no matches

**Debounce Implementation**:

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearchQuery(searchQuery)
    setCurrentPage(1) // Reset to first page on search
  }, 300)

  return () => clearTimeout(timer)
}, [searchQuery])
```

## Accessibility Features

- **Semantic HTML**: `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`
- **ARIA attributes**: `role="button"`, `aria-sort`, `aria-label`, `aria-disabled`
- **Keyboard navigation**: Sortable headers respond to Enter/Space
- **Screen reader support**: Sort direction announced, pagination state announced
- **Focus indicators**: Clear visual focus states
- **Error announcements**: `role="alert"` for live regions

## Potential Enhancements

**If this were a production app, consider adding**:

1. **Column visibility toggle**: Show/hide columns
2. **Caching**: Store API results (React Query, SWR)
3. **Virtualization**: For very large tables (react-window)
4. **API Call**: Native fetch API is good for demo purposes but for production we should use React Query
5. **URL-based pagination**: Sync pagination state with URL query params

## References

- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [shadcn/ui Table Component](https://ui.shadcn.com/docs/components/table)
- [shadcn/ui Pagination Component](https://ui.shadcn.com/docs/components/pagination)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [ARIA: sortable table](https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/)
