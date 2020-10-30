const routes = [
  {
    path: '/',
    name: 'browser',
    component: ()=>import('../layout/browser/index.vue'),
    children: [
      {
        path: '/',
        name: 'browser-home',
        component: ()=>import('../layout/browser/views/home.vue')
      }
    ]
  }
]

export default routes