import Vue from 'vue'
import Router from 'vue-router'

import AppIndex from '@/components/AppIndex'
import Login from '@/components/Login'
import Enroll from '@/components/Enroll'
import Home from '../components/Home'
import Person from '../components/Person'
import workersIndex from '../components/workers/workersIndex'
import Administrator from '../components/Administrator'
import EmployeeInformation from '../components/workers/EmployeeInformation'
import CustomerInformation from '../components/workers/CustomerInformation'
import HotelInformation from '../components/workers/HotelInformation'
import DataPresentation from '../components/workers/DataPresentation'
import AdministratorIndex from '../components/AdministratorIndex'
import CheckedIn from '../components/CheckedIn'
import Checkout from '../components/Checkout'
import RoomInformation from '../components/workers/RoomInformation'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index', // 仍然通过/index访问
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/workers',
          name: 'Workers',
          component: workersIndex,
          redirect: '/employeeInformation',
          children: [
            {
              path: '/employeeInformation',
              name: 'EmployeeInformation',
              component: EmployeeInformation
            },
            {
              path: '/customerInformation',
              name: 'CustomerInformation',
              component: CustomerInformation
            },
            {
              path: '/hotelInformation',
              name: 'HotelInformation',
              component: HotelInformation
            },
            {
              path: '/dataPresentation',
              name: 'DataPresentation',
              component: DataPresentation
            },
            {
              path: '/roomInformation',
              name: 'RoomInformation',
              component: RoomInformation
            }
          ]
        },
        {
          path: '/person',
          name: 'Person',
          component: Person
        },
        {
          path: '/administratorIndex',
          name: 'AdministratorIndex',
          component: AdministratorIndex,
          redirect: '/administrator',
          children: [
            {
              path: '/administrator',
              name: 'Administrator',
              component: Administrator
            },
            {
              path: '/checkedIn',
              name: 'CheckedIn',
              component: CheckedIn
            },
            {
              path: '/checkout',
              name: 'Checkout',
              component: Checkout
            }
          ]
        }
      ]
    },
    {
      path: '/enroll',
      name: 'Enroll',
      component: Enroll
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
