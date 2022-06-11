<template>
  <div class="inline-block">
    <div class="pb-4 text-2md align-middle font-semibold text-center text-gray-100">{{ selectedDayOfWeek }}</div>
    <div class="py-1 text-2xl align-middle font-semibold text-center text-gray-100">{{ selectedDay }}</div>
    <div class="pt-4 text-2md align-middle font-semibold text-center text-gray-100">{{ selectedMonth }}</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    selectedDate: {
      required: true
    }
  },

  computed: {
    selectedDateJS:{
      get(){
        return dayjs(this.$store.state.selectedDateJS)
      }
    },
    selectedDayOfWeek() {
      return this.selectedDateJS.format("dd");
    },
      selectedDay() {
        return this.selectedDateJS.format("D")
      },
    selectedMonth() {
      return this.selectedDateJS.format("MMM");
    },

  }
};
</script>