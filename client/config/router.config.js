export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // Github-Monitor
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/list' },
      {
        path: '/list',
        name: 'githubList',
        icon: 'dashboard',
        component: './GithubList/GithubList',
      },
      {
        path: '/task',
        name: 'taskLists',
        icon: 'schedule',
        component: './Tasks/TaskLists',
      },
      {
        path: '/token',
        name: 'tokenLists',
        icon: 'lock',
        component: './Token/TokenLists',
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
    ],
    authority: ['admin', 'user'],
    Routes: ['src/pages/Authorized'],
  },
];
