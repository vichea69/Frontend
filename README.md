# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

frontend/
├─ .env
├─ .gitignore
├─ .idea/
│ ├─ .gitignore
│ ├─ frontend.iml
│ ├─ inspectionProfiles/
│ │ └─ Project_Default.xml
│ ├─ modules.xml
│ ├─ prettier.xml
│ ├─ vcs.xml
│ └─ workspace.xml
├─ README.md
├─ components.json
├─ dist/
│ ├─ assets/
│ │ ├─ index-BFoGCN40.js
│ │ └─ index-DkDX4XCm.css
│ ├─ index.html
│ └─ vite.svg
├─ eslint.config.js
├─ index.html
├─ jsconfig.app.json
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public/
│ └─ vite.svg
├─ src/
│ ├─ App.css
│ ├─ App.jsx
│ ├─ api/
│ │ └─ api.jsx
│ ├─ assets/
│ │ ├─ react.svg
│ │ └─ vichea.svg
│ ├─ components/
│ │ ├─ CreateProductForm.jsx
│ │ ├─ Footer/
│ │ │ └─ Footer.jsx
│ │ ├─ Form/
│ │ │ ├─ Login.jsx
│ │ │ └─ Register.jsx
│ │ ├─ Header/
│ │ │ ├─ Header.jsx
│ │ │ └─ Logo.jsx
│ │ ├─ Hero.jsx
│ │ ├─ Home/
│ │ │ ├─ Feature.jsx
│ │ │ └─ InfiniteMovingCard.jsx
│ │ ├─ IconCloud.jsx
│ │ ├─ Marquee.jsx
│ │ ├─ ProductCard.jsx
│ │ ├─ blueFad.jsx
│ │ ├─ circles.jsx
│ │ ├─ mode-toggle.jsx
│ │ ├─ theme-provider.jsx
│ │ └─ ui/
│ │ ├─ alert-dialog.jsx
│ │ ├─ background-gradient.jsx
│ │ ├─ badge.jsx
│ │ ├─ blur-fade.jsx
│ │ ├─ button.jsx
│ │ ├─ canvas-reveal-effect.jsx
│ │ ├─ card.jsx
│ │ ├─ checkbox.jsx
│ │ ├─ dialog.jsx
│ │ ├─ dropdown-menu.jsx
│ │ ├─ form.jsx
│ │ ├─ icon-cloud.jsx
│ │ ├─ infinite-moving-cards.jsx
│ │ ├─ input.jsx
│ │ ├─ label.jsx
│ │ ├─ marquee.jsx
│ │ ├─ navigation-menu.jsx
│ │ ├─ orbiting-circles.jsx
│ │ ├─ rainbow-button.jsx
│ │ ├─ select.jsx
│ │ ├─ separator.jsx
│ │ ├─ sheet.jsx
│ │ └─ textarea.jsx
│ ├─ context/
│ │ ├─ AuthContext.jsx
│ │ ├─ CartContext.jsx
│ │ ├─ CategoryContext.jsx
│ │ └─ ProductContext.jsx
│ ├─ index.css
│ ├─ layouts/
│ │ └─ MainLayout.jsx
│ ├─ lib/
│ │ └─ utils.js
│ ├─ main.jsx
│ ├─ pages/
│ │ ├─ About.jsx
│ │ ├─ Cart/
│ │ │ ├─ AddToCartAlert.jsx
│ │ │ └─ SheetCart.jsx
│ │ ├─ Category/
│ │ │ ├─ AlertDeleteCategory.jsx
│ │ │ ├─ Category.jsx
│ │ │ ├─ DialogAddCategory.jsx
│ │ │ └─ DialogUpdateCategory.jsx
│ │ ├─ Contact.jsx
│ │ ├─ Dashbord/
│ │ │ ├─ MovieCard.jsx
│ │ │ ├─ Product.jsx
│ │ │ └─ TestCard.jsx
│ │ ├─ Home.jsx
│ │ ├─ NotFound.jsx
│ │ ├─ Product/
│ │ │ ├─ AlertDeleteProduct.jsx
│ │ │ ├─ CreateProduct.jsx
│ │ │ ├─ ProductListManagement.jsx
│ │ │ ├─ ProductOverview.jsx
│ │ │ └─ UpdateProduct.jsx
│ │ └─ Productform.jsx
│ ├─ routes/
│ │ ├─ AppRoutes.jsx
│ │ └─ ProtectedRoute.jsx
│ ├─ services/
│ │ └─ AuthService.jsx
│ └─ utils/
├─ tailwind.config.js
└─ vite.config.js
