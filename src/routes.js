import Play from "./route/Play"
import Home from "./route/Home"

export const routes=[
  {path: '/play' ,name: 'playLink' ,component: Play },
  {path: '/' ,name: 'homeLink' ,component: Home },
 // {path:'*',redirect:'/'},

]
