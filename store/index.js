import dayjs from "dayjs"

export const state = () => ({
    isloggingin: false,
    loginpopup: 'none',
    regispopup: 'none',
    username: null,
    password: null,
    firstname: '-',
    ticketleft: 70,
    allticket: [
        {
            "id": 1,
            "ticketclass": "A",
            "ticketprice": 5000,
            "ticketavailable": 10,
            "ticketmaxperday": 10,
            "ticketminimumbuy": 1
        },
        {
            "id": 2,
            "ticketclass": "B",
            "ticketprice": 2500,
            "ticketavailable": 20,
            "ticketmaxperday": 20,
            "ticketminimumbuy": 2
        },
        {
            "id": 3,
            "ticketclass": "C",
            "ticketprice": 1000,
            "ticketavailable": 30,
            "ticketmaxperday": 30,
            "ticketminimumbuy": 2
        },
        {
            "id": 4,
            "ticketclass": "D",
            "ticketprice": 500,
            "ticketavailable": 40,
            "ticketmaxperday": 40,
            "ticketminimumbuy": 3
        }
    ],
    isbuyingticket: false,
    selectedticketdate: dayjs().format('DD/MM/YYYY'),
    lastrefreshtime: dayjs().format('DD/MM/YYYY, HH:mm:ss'),
    calendardisplay: 'none',
    selectedDateJS: dayjs()
    
})


export const mutations = {
    setIsLoggingIn(state,payload){
        state.isloggingin = payload
    },
    setLoginpopup(state,payload){
        state.loginpopup = payload
    },
    setRegispopup(state,payload){
        state.regispopup = payload
    },
    setUsername(state,payload){
        state.username = payload
    },
    setPassword(state,payload){
        state.password = payload
    },
    setFirstname(state,payload){
        state.firstname = payload
    },
    setTicketleft(state,payload){
        state.ticketleft = payload
    },
    setAllticket(state,payload){
        state.allticket = payload
    },
    setIsBuyingticket(state,payload){
        state.isbuyingticket = payload
    },
    setSelectedTicketdate(state,payload){
        state.selectedticketdate = payload
    },
    setLastrefreshtime(state,payload){
        state.lastrefreshtime = payload
    },
    changeCalendarDisplay(state,payload){
        state.calendardisplay = payload
    },
    setSelectedDateJS(state,payload){
        state.selectedDateJS = dayjs(payload,'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ss.sss[Z]') 
    },
    
}