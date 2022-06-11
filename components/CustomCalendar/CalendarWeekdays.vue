<template>
  <ol class="day-of-week text-md text-gray-200 bg-red-600 pb-1 pt-2 grid grid-cols-7">
    <li class="text-right pr-1"
      v-for="weekday in weekdays"
      :key="weekday"
    >
      {{ weekday }}
    </li>
  </ol>
</template>

<script>
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default {
  name: 'CalendarWeekdays',

  computed: {
    weekdays() {
      return WEEKDAYS
    }
  }
}
</script>