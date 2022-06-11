<template>
  <div>
    <Ticketcart/>
    <Loginpopup/>
    <Regispopup/>
    <CalendarMonth></CalendarMonth>
  </div>
</template>

<script>
import Loginpopup from '../../components/Loginpopup.vue'
import CalendarMonth from '../../components/CustomCalendar/CalendarMonth.vue'
export default {
  components: { Loginpopup, CalendarMonth },}
</script>
