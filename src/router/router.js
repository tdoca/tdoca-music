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
      },
      {
        path: 'hot',
        name: 'browser-hot',
        component: ()=>import('@/layout/browser/views/hot.vue')
      },
      {
        path: 'search',
        name: 'browser-search',
        component: ()=>import('@/layout/browser/views/search.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: ()=>{return '<template><div>404</div></template>'}
  }
]

export default routes