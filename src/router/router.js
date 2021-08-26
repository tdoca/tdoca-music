const routes = [
  // {
  //   path: '/',
  //   name: 'browser',
  //   component: ()=>import('../layout/browser/index.vue'),
  //   children: [
  //     {
  //       path: '/',
  //       name: 'browser-home',
  //       component: ()=>import('../layout/browser/views/home.vue')
  //     },
  //     {
  //       path: 'hot',
  //       name: 'browser-hot',
  //       component: ()=>import('@/layout/browser/views/hot.vue')
  //     },
  //     {
  //       path: 'search',
  //       name: 'browser-search',
  //       component: ()=>import('@/layout/browser/views/search.vue')
  //     }
  //   ]
  // },
  {
    path: '/',
    name: 'player',
    component: ()=>import('@/layout/player/index.vue'),
    children: [
      {
        path: '/',
        name: 'player',
        component: ()=>import('@/layout/player/views/song_sheet.vue')
      },
      {
        path: '/*',
        name: '*',
        component: ()=>import('@/layout/player/views/song_sheet.vue')
      },
      {
        path: 'search',
        name: 'player-search',
        component: ()=>import('@/layout/player/views/search.vue')
      },
      {
        path: 'songsheet',
        name: 'songsheet',
        component: ()=>import('@/layout/player/views/song_sheet.vue')
      },
      {
        path: 'playlist',
        name: 'playlist',
        component: ()=>import('@/layout/player/views/play_list.vue')
      },
      {
        path: 'history',
        name: 'history',
        component: ()=>import('@/layout/player/views/history.vue')
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