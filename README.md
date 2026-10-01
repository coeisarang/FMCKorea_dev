# FMCKorea static prototype

- `index.html`: login screen (common layout intentionally not applied)
- Other HTML files: original FMC common layout injected by `common-layout.js`
- Common style order: `css/base.css` -> `css/components.css` -> `css/layout.css` -> `common.css`
- Login mode is stored in `sessionStorage.fmcLoginMode` (`admin` / `sales`).

## Important
The supplied `layout.css` references original project image assets under `images/...` and the original layout uses Pretendard via `font/font.css`.
Those assets were not included in the files supplied for this static prototype. `common.css` therefore provides fallbacks for the logo, menu icons, menu arrow, and my-info icon.
For a pixel-identical result, copy the original `font/` and `images/` folders from the ASP.NET project into this static project and then remove the fallback icon/logo rules from `common.css`.
