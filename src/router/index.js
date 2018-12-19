
let routes = [
  {
    path: '/main',
    name: 'main',
    component: () => import('@/components/demoIndex'),
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/hellow',
    name: 'HelloWorld',
    component: () => import('@/components/HelloWorld'),
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/page1',
    name: 'Page1',
    component: () => import('@/components/page1'),
    meta: {
      allowAnonymous: true
    }
  }
]

export default routes
