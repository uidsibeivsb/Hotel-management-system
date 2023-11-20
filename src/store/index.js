import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    },
    hr: {
      id: '',
      phone: '',
      address: '',
      hotelname: ''
    },
    admin: {
      Aroom: '',
      id: '',
      date: ''
    },
    employ: {
      id: '',
      name: '',
      password: '',
      sex: '',
      phone: '',
      email: '',
      position: '',
      salary: '',
      hotelname: ''
    },
    customer: {
      id: '',
      name: '',
      password: '',
      sex: '',
      phone: '',
      email: '',
      IDcard: ''
    },
    hotel: {
      id: '',
      name: '',
      phone: '',
      address: '',
      describe: '',
      photoaddress: ''
    },
    Phone: '',
    Room: {
      number: '',
      type: '',
      pcount: '',
      bcount: '',
      price: '',
      rinformation: '',
      hid: '',
      id: ''
    },
    personID: ''
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    setALL (state, hotel) {
      console.log(hotel)
      // eslint-disable-next-line no-unused-expressions,no-sequences
      state.hr.phone = hotel.phone,
      state.hr.address = hotel.address,
      state.hr.hotelname = hotel.name,
      state.hr.id = hotel.id,
      console.log(state.hr.phone)
    },
    setroom (state, item) {
      // eslint-disable-next-line no-unused-expressions,no-sequences
      state.admin.Aroom = item.num,
      state.admin.id = item.id,
      state.admin.date = item.orderTime
    },
    setEmploy (state, item) {
      // eslint-disable-next-line no-unused-expressions,no-sequences
      state.employ.id = item.id,
      state.employ.email = item.email,
      state.employ.sex = item.sex,
      state.employ.phone = item.phone,
      state.employ.name = item.name,
      state.employ.password = item.password,
      state.employ.salary = item.salary,
      state.employ.position = item.position,
      state.employ.hotelname = item.hotelName
    },
    setcustomer (state, item) {
      // eslint-disable-next-line no-unused-expressions,no-sequences
      state.customer.id = item.id,
      state.customer.name = item.name,
      state.customer.sex = item.sex,
      state.customer.email = item.email,
      state.customer.IDcard = item.idcard,
      state.customer.phone = item.phone,
      state.customer.password = item.password
    },
    sethotel (state, item) {
      // eslint-disable-next-line no-unused-expressions,no-sequences
      state.hotel.id = item.id,
      state.hotel.address = item.address,
      state.hotel.name = item.name,
      state.hotel.phone = item.phone,
      state.hotel.describe = item.describ,
      state.hotel.photoaddress = item.photoaddress
    },
    setphone (state, ph) {
      state.Phone = ph
      console.log(this.state.Phone)
    },
    EditRoom (state, item) {
      // eslint-disable-next-line no-unused-expressions,no-sequences
      state.Room.number = item.number,
      state.Room.type = item.type,
      state.Room.pcount = item.pcount,
      state.Room.bcount = item.bcount,
      state.Room.price = item.price,
      state.Room.rinformation = item.rinformation,
      state.Room.hid = item.hid,
      state.Room.id = item.id
    },
    setperson (state, id) {
      state.personID = id
    }
  }
})
