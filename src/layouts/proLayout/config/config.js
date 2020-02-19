export default {
    title: 'SAT TEAM',
    navTheme: 'dark',
    logo: "https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ",
    //  layout: "topmenu",
    contentWidth: "Fluid",
    fixedHeader: true,
    autoHideHeader: false,
    fixSiderbar: true,
    menuDataRender: () => [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: "home",
        },
        // {
        //     path: "/products",
        //     name: "Products",
        //     icon: "money-collect",
        // },
        // {
        //     path: "/clients",
        //     name: "Clients",
        //     icon: "transaction",
        // },
        {
            path: "/user-management",
            name: "User management",
            icon: "user",
            children: [
                {
                    path: "/user-management/user-list",
                    name: "User List",
                    icon: "ordered-list"
                },
                {
                    path: "/user-management/user-create",
                    name: "",
                    icon: "user-add"
                }
            ]
        }
    ],

}

// {
//     "navTheme": "realDark",
//         "primaryColor": "daybreak",
//             "layout": "sidemenu",
//                 "contentWidth": "Fluid",
//                     "fixedHeader": false,
//                         "autoHideHeader": false,
//                             "fixSiderbar": false,
//                                 "menu": {
//         "locale": true
//     },
//     "title": "Ant Design Pro",
//         "pwa": false,
//             "iconfontUrl": ""
// }
// {
//     "navTheme": "dark",
//     "primaryColor": "daybreak",
//     "layout": "topmenu",
//     "contentWidth": "Fixed",
//     "fixedHeader": false,
//     "autoHideHeader": false,
//     "fixSiderbar": false,
//     "menu": {
//       "locale": true
//     },
//     "title": "Ant Design Pro",
//     "pwa": false,
//     "iconfontUrl": ""
//   }
// {
//     "navTheme": "dark",
//     "primaryColor": "daybreak",
//     "layout": "topmenu",
//     "contentWidth": "Fluid",
//     "fixedHeader": false,
//     "autoHideHeader": false,
//     "fixSiderbar": false,
//     "menu": {
//       "locale": true
//     },
//     "title": "Ant Design Pro",
//     "pwa": false,
//     "iconfontUrl": ""
//   }{
//   "navTheme": "dark",
//   "primaryColor": "daybreak",
//   "layout": "sidemenu",
//   "contentWidth": "Fluid",
//   "fixedHeader": true,
//   "autoHideHeader": false,
//   "fixSiderbar": true,
//   "menu": {
//     "locale": true
//   },
//   "title": "Ant Design Pro",
//   "pwa": false,
//   "iconfontUrl": ""
// }
