import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=8905f5fc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=8905f5fc"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=8905f5fc"; const ReactDOM = __vite__cjsImport2_reactDom_client.__esModule ? __vite__cjsImport2_reactDom_client.default : __vite__cjsImport2_reactDom_client;
import App from "/src/App.jsx?t=1721936864722";
import "/src/index.css?t=1721937561057";
import { createBrowserRouter, RouterProvider, Navigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8905f5fc";
import About from "/src/pages/utils/About.jsx?t=1721937561057";
import BrandDetails from "/src/pages/brands/BrandDetails.jsx";
import Home from "/src/pages/Home.jsx";
import Settings from "/src/pages/Settings.jsx";
import Items from "/src/pages/items/Items.jsx";
import Users from "/src/pages/users/Users.jsx";
import Moves from "/src/pages/movements/Movements.jsx";
import Supply from "/src/pages/items/Supply.jsx";
import Takeout from "/src/pages/items/Takeout.jsx";
import ItemDetails from "/src/pages/items/ItemDetails.jsx";
import MoveDetails from "/src/pages/movements/MoveDetails.jsx";
import UserDetails from "/src/pages/users/UserDetails.jsx";
import Logout from "/src/pages/users/auth/Logout.jsx";
import ComponentDetails from "/src/pages/components/ComponentDetails.jsx";
import LocalDetails from "/src/pages/locals/LocalDetails.jsx";
import CategoryDetails from "/src/pages/categories/CategoryDetails.jsx";
import UnityDetails from "/src/pages/units/UnityDetails.jsx";
import ErrorPage from "/src/pages/utils/ErrorPage.jsx";
import { Login } from "/src/pages/users/auth/Login.jsx";
import { Register } from "/src/pages/users/auth/Register.jsx";
import { ResetPassWord } from "/src/pages/users/auth/ResetPassWord.jsx";
import { ConfirmEmail } from "/src/pages/users/auth/ConfirmEmail.jsx";
import { UpdatePassWord } from "/src/pages/users/auth/UpdatePassWord.jsx";
const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
        fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
        lineNumber: 33,
        columnNumber: 12
      }, this),
      errorElement: /* @__PURE__ */ jsxDEV(ErrorPage, { error: "Página não encontrada" }, void 0, false, {
        fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
        lineNumber: 34,
        columnNumber: 17
      }, this),
      children: [
        {
          path: "/login",
          element: /* @__PURE__ */ jsxDEV(Login, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 38,
            columnNumber: 14
          }, this)
        },
        {
          path: "/register",
          element: /* @__PURE__ */ jsxDEV(Register, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 42,
            columnNumber: 14
          }, this)
        },
        {
          path: "/forgot-password",
          element: /* @__PURE__ */ jsxDEV(ResetPassWord, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 46,
            columnNumber: 14
          }, this)
        },
        {
          path: "/update-password",
          element: /* @__PURE__ */ jsxDEV(UpdatePassWord, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 50,
            columnNumber: 14
          }, this)
        },
        {
          path: "/confirm-email/:id",
          element: /* @__PURE__ */ jsxDEV(ConfirmEmail, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 54,
            columnNumber: 14
          }, this)
        },
        {
          path: "/",
          element: /* @__PURE__ */ jsxDEV(Home, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 58,
            columnNumber: 14
          }, this)
        },
        {
          path: "/items",
          element: /* @__PURE__ */ jsxDEV(Items, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 62,
            columnNumber: 14
          }, this)
        },
        {
          path: "/users",
          element: /* @__PURE__ */ jsxDEV(Users, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 66,
            columnNumber: 14
          }, this)
        },
        {
          path: "/moves",
          element: /* @__PURE__ */ jsxDEV(Moves, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 70,
            columnNumber: 14
          }, this)
        },
        {
          path: "/supply",
          element: /* @__PURE__ */ jsxDEV(Supply, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 74,
            columnNumber: 14
          }, this)
        },
        {
          path: "/takeout",
          element: /* @__PURE__ */ jsxDEV(Takeout, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 78,
            columnNumber: 14
          }, this)
        },
        {
          path: "/about",
          element: /* @__PURE__ */ jsxDEV(About, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 82,
            columnNumber: 14
          }, this)
        },
        {
          path: "/settings",
          element: /* @__PURE__ */ jsxDEV(Settings, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 86,
            columnNumber: 14
          }, this)
        },
        {
          path: "/logout",
          element: /* @__PURE__ */ jsxDEV(Logout, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 90,
            columnNumber: 14
          }, this)
        },
        {
          path: "items/:id",
          element: /* @__PURE__ */ jsxDEV(ItemDetails, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 94,
            columnNumber: 14
          }, this)
        },
        {
          path: "moves/:id",
          element: /* @__PURE__ */ jsxDEV(MoveDetails, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 98,
            columnNumber: 14
          }, this)
        },
        {
          path: "users/:id",
          element: /* @__PURE__ */ jsxDEV(UserDetails, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 102,
            columnNumber: 14
          }, this)
        },
        {
          path: "brands/:id",
          element: /* @__PURE__ */ jsxDEV(BrandDetails, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 106,
            columnNumber: 14
          }, this)
        },
        {
          path: "components/:id",
          element: /* @__PURE__ */ jsxDEV(ComponentDetails, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 110,
            columnNumber: 14
          }, this)
        },
        {
          path: "locals/:id",
          element: /* @__PURE__ */ jsxDEV(LocalDetails, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 114,
            columnNumber: 14
          }, this)
        },
        {
          path: "categories/:id",
          element: /* @__PURE__ */ jsxDEV(CategoryDetails, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 118,
            columnNumber: 14
          }, this)
        },
        {
          path: "units/:id",
          element: /* @__PURE__ */ jsxDEV(UnityDetails, {}, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 122,
            columnNumber: 14
          }, this)
        },
        {
          path: "/oldroute",
          element: /* @__PURE__ */ jsxDEV(Navigate, { to: "/contact" }, void 0, false, {
            fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
            lineNumber: 126,
            columnNumber: 14
          }, this)
        }
      ]
    }
  ]
);
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(RouterProvider, { router: routes }, void 0, false, {
    fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
    lineNumber: 134,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "C:/Users/joao.scheleder@grupoboticario.com.br/estoque_front/src/main.jsx",
    lineNumber: 133,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,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O0FBQUE7QUFBQSxpQkFBYTtBQUFBLFFBQ3hCO0FBQUEsUUFDQTtBQUFBLFVBQ0VELE1BQU07QUFBQSxVQUNOQyxTQUFTLHVCQUFDLFlBQVMsSUFBRyxjQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXVCO0FBQUEsUUFDbEM7QUFBQSxNQUFDO0FBQUEsSUFFTDtBQUFBLEVBQUM7QUFDRjtBQUVEOUIsU0FBU2lDLFdBQVdDLFNBQVNDLGVBQWUsTUFBTSxDQUFDLEVBQUVDO0FBQUFBLEVBQ25ELHVCQUFDLE1BQU0sWUFBTixFQUNDLGlDQUFDLGtCQUFlLFFBQVFSLFVBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBK0IsS0FEakM7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUVBO0FBQ0YiLCJuYW1lcyI6WyJSZWFjdCIsIlJlYWN0RE9NIiwiQXBwIiwiY3JlYXRlQnJvd3NlclJvdXRlciIsIlJvdXRlclByb3ZpZGVyIiwiTmF2aWdhdGUiLCJBYm91dCIsIkJyYW5kRGV0YWlscyIsIkhvbWUiLCJTZXR0aW5ncyIsIkl0ZW1zIiwiVXNlcnMiLCJNb3ZlcyIsIlN1cHBseSIsIlRha2VvdXQiLCJJdGVtRGV0YWlscyIsIk1vdmVEZXRhaWxzIiwiVXNlckRldGFpbHMiLCJMb2dvdXQiLCJDb21wb25lbnREZXRhaWxzIiwiTG9jYWxEZXRhaWxzIiwiQ2F0ZWdvcnlEZXRhaWxzIiwiVW5pdHlEZXRhaWxzIiwiRXJyb3JQYWdlIiwiTG9naW4iLCJSZWdpc3RlciIsIlJlc2V0UGFzc1dvcmQiLCJDb25maXJtRW1haWwiLCJVcGRhdGVQYXNzV29yZCIsInJvdXRlcyIsInBhdGgiLCJlbGVtZW50IiwiZXJyb3JFbGVtZW50IiwiY2hpbGRyZW4iLCJjcmVhdGVSb290IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJtYWluLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tL2NsaWVudCdcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAuanN4J1xuaW1wb3J0ICcuL2luZGV4LmNzcydcbmltcG9ydCB7IGNyZWF0ZUJyb3dzZXJSb3V0ZXIsIFJvdXRlclByb3ZpZGVyLCBOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgQWJvdXQgZnJvbSAnLi9wYWdlcy91dGlscy9BYm91dC5qc3gnXG5pbXBvcnQgQnJhbmREZXRhaWxzIGZyb20gJy4vcGFnZXMvYnJhbmRzL0JyYW5kRGV0YWlscy5qc3gnXG5pbXBvcnQgSG9tZSBmcm9tICcuL3BhZ2VzL0hvbWUuanN4J1xuaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vcGFnZXMvU2V0dGluZ3MuanN4J1xuaW1wb3J0IEl0ZW1zIGZyb20gJy4vcGFnZXMvaXRlbXMvSXRlbXMuanN4J1xuaW1wb3J0IFVzZXJzIGZyb20gJy4vcGFnZXMvdXNlcnMvVXNlcnMuanN4J1xuaW1wb3J0IE1vdmVzIGZyb20gJy4vcGFnZXMvbW92ZW1lbnRzL01vdmVtZW50cy5qc3gnXG5pbXBvcnQgU3VwcGx5IGZyb20gJy4vcGFnZXMvaXRlbXMvU3VwcGx5LmpzeCdcbmltcG9ydCBUYWtlb3V0IGZyb20gJy4vcGFnZXMvaXRlbXMvVGFrZW91dC5qc3gnXG5pbXBvcnQgSXRlbURldGFpbHMgZnJvbSAnLi9wYWdlcy9pdGVtcy9JdGVtRGV0YWlscy5qc3gnXG5pbXBvcnQgTW92ZURldGFpbHMgZnJvbSAnLi9wYWdlcy9tb3ZlbWVudHMvTW92ZURldGFpbHMuanN4J1xuaW1wb3J0IFVzZXJEZXRhaWxzIGZyb20gJy4vcGFnZXMvdXNlcnMvVXNlckRldGFpbHMuanN4J1xuaW1wb3J0IExvZ291dCBmcm9tICcuL3BhZ2VzL3VzZXJzL2F1dGgvTG9nb3V0LmpzeCdcbmltcG9ydCBDb21wb25lbnREZXRhaWxzIGZyb20gJy4vcGFnZXMvY29tcG9uZW50cy9Db21wb25lbnREZXRhaWxzLmpzeCdcbmltcG9ydCBMb2NhbERldGFpbHMgZnJvbSAnLi9wYWdlcy9sb2NhbHMvTG9jYWxEZXRhaWxzLmpzeCdcbmltcG9ydCBDYXRlZ29yeURldGFpbHMgZnJvbSAnLi9wYWdlcy9jYXRlZ29yaWVzL0NhdGVnb3J5RGV0YWlscy5qc3gnXG5pbXBvcnQgVW5pdHlEZXRhaWxzIGZyb20gJy4vcGFnZXMvdW5pdHMvVW5pdHlEZXRhaWxzLmpzeCdcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAnLi9wYWdlcy91dGlscy9FcnJvclBhZ2UuanN4J1xuaW1wb3J0IHsgTG9naW4gfSBmcm9tICcuL3BhZ2VzL3VzZXJzL2F1dGgvTG9naW4uanN4J1xuaW1wb3J0IHsgUmVnaXN0ZXIgfSBmcm9tICcuL3BhZ2VzL3VzZXJzL2F1dGgvUmVnaXN0ZXIuanN4J1xuaW1wb3J0IHsgUmVzZXRQYXNzV29yZCB9IGZyb20gJy4vcGFnZXMvdXNlcnMvYXV0aC9SZXNldFBhc3NXb3JkLmpzeCdcbmltcG9ydCB7IENvbmZpcm1FbWFpbCB9IGZyb20gJy4vcGFnZXMvdXNlcnMvYXV0aC9Db25maXJtRW1haWwuanN4J1xuaW1wb3J0IHsgVXBkYXRlUGFzc1dvcmQgfSBmcm9tICcuL3BhZ2VzL3VzZXJzL2F1dGgvVXBkYXRlUGFzc1dvcmQuanN4J1xuXG5jb25zdCByb3V0ZXMgPSBjcmVhdGVCcm93c2VyUm91dGVyKFtcbiAge1xuICAgIHBhdGg6IFwiL1wiLFxuICAgIGVsZW1lbnQ6IDxBcHAgLz4sXG4gICAgZXJyb3JFbGVtZW50OiA8RXJyb3JQYWdlIGVycm9yPSdQw6FnaW5hIG7Do28gZW5jb250cmFkYScgLz4sXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvbG9naW5cIixcbiAgICAgICAgZWxlbWVudDogPExvZ2luIC8+XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIi9yZWdpc3RlclwiLFxuICAgICAgICBlbGVtZW50OiA8UmVnaXN0ZXIgLz5cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiL2ZvcmdvdC1wYXNzd29yZFwiLFxuICAgICAgICBlbGVtZW50OiA8UmVzZXRQYXNzV29yZCAvPlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvdXBkYXRlLXBhc3N3b3JkXCIsXG4gICAgICAgIGVsZW1lbnQ6IDxVcGRhdGVQYXNzV29yZCAvPlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvY29uZmlybS1lbWFpbC86aWRcIixcbiAgICAgICAgZWxlbWVudDogPENvbmZpcm1FbWFpbCAvPlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvXCIsXG4gICAgICAgIGVsZW1lbnQ6IDxIb21lIC8+XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIi9pdGVtc1wiLFxuICAgICAgICBlbGVtZW50OiA8SXRlbXMgLz5cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiL3VzZXJzXCIsXG4gICAgICAgIGVsZW1lbnQ6IDxVc2VycyAvPlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvbW92ZXNcIixcbiAgICAgICAgZWxlbWVudDogPE1vdmVzIC8+XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIi9zdXBwbHlcIixcbiAgICAgICAgZWxlbWVudDogPFN1cHBseSAvPlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvdGFrZW91dFwiLFxuICAgICAgICBlbGVtZW50OiA8VGFrZW91dCAvPlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvYWJvdXRcIixcbiAgICAgICAgZWxlbWVudDogPEFib3V0IC8+XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIi9zZXR0aW5nc1wiLFxuICAgICAgICBlbGVtZW50OiA8U2V0dGluZ3MgLz5cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiL2xvZ291dFwiLFxuICAgICAgICBlbGVtZW50OiA8TG9nb3V0IC8+XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIml0ZW1zLzppZFwiLFxuICAgICAgICBlbGVtZW50OiA8SXRlbURldGFpbHMgLz5cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwibW92ZXMvOmlkXCIsXG4gICAgICAgIGVsZW1lbnQ6IDxNb3ZlRGV0YWlscyAvPlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJ1c2Vycy86aWRcIixcbiAgICAgICAgZWxlbWVudDogPFVzZXJEZXRhaWxzIC8+XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcImJyYW5kcy86aWRcIixcbiAgICAgICAgZWxlbWVudDogPEJyYW5kRGV0YWlscyAvPlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJjb21wb25lbnRzLzppZFwiLFxuICAgICAgICBlbGVtZW50OiA8Q29tcG9uZW50RGV0YWlscyAvPlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJsb2NhbHMvOmlkXCIsXG4gICAgICAgIGVsZW1lbnQ6IDxMb2NhbERldGFpbHMgLz5cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiY2F0ZWdvcmllcy86aWRcIixcbiAgICAgICAgZWxlbWVudDogPENhdGVnb3J5RGV0YWlscyAvPlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJ1bml0cy86aWRcIixcbiAgICAgICAgZWxlbWVudDogPFVuaXR5RGV0YWlscyAvPlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvb2xkcm91dGVcIixcbiAgICAgICAgZWxlbWVudDogPE5hdmlnYXRlIHRvPVwiL2NvbnRhY3RcIiAvPlxuICAgICAgfVxuICAgIF0sXG4gIH1cbl0pO1xuXG5SZWFjdERPTS5jcmVhdGVSb290KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpLnJlbmRlcihcbiAgPFJlYWN0LlN0cmljdE1vZGU+XG4gICAgPFJvdXRlclByb3ZpZGVyIHJvdXRlcj17cm91dGVzfSAvPlxuICA8L1JlYWN0LlN0cmljdE1vZGU+XG4pXG4iXSwiZmlsZSI6IkM6L1VzZXJzL2pvYW8uc2NoZWxlZGVyQGdydXBvYm90aWNhcmlvLmNvbS5ici9lc3RvcXVlX2Zyb250L3NyYy9tYWluLmpzeCJ9