BRAT GENERATOR VISIBILITY FIX

1. Extract this ZIP.
2. Copy the "components" folder into your project root.
3. Choose "Replace the files in the destination" when Windows asks.
4. Run:
   npm run dev
5. Open the homepage and scroll to the Generator section.

What changed:
- The generator iframe is now rendered immediately instead of waiting for IntersectionObserver/client-side lazy-load state.
- The generator shell no longer depends on the reveal animation to become visible.
- A safe default iframe height is rendered immediately.
- The existing iframe height postMessage is used to resize after load.
- Download analytics tracking is preserved.
