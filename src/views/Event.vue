<template>
  <div>
    <label for="">Wybierz dzień</label>
    <div class="day-switcher">
      <div>
        <input
          id="th"
          v-model="selectedDay"
          value="th"
          name="day-switcher"
          type="radio"
          class="switch"
        />
        <label for="th">Czwartek</label>
      </div>
      <div>
        <input
          id="fr"
          v-model="selectedDay"
          value="fr"
          name="day-switcher"
          type="radio"
          class="switch"
        />
        <label for="fr">Piątek</label>
      </div>
      <div>
        <input
          id="sat"
          v-model="selectedDay"
          value="sat"
          name="day-switcher"
          type="radio"
          class="switch"
        />
        <label for="sat">Sobota</label>
      </div>
    </div>

    <div class="search">
      <label for="">Wyszukaj</label>
      <input
        type="text"
        placeholder="Magdal..."
        @keyup="filterResults"
        v-model="filterString"
      />
    </div>
    <p>Legenda oznaczeń:</p>
    <div class="legend">
      <div class="legend__item">
        <span class="not-absent"></span> - Zgłoszona nieobecność
      </div>
      <div class="legend__item">
        <span class="not-agreement"></span> - Brak zgody
      </div>
      <div class="legend__item"><span></span> - Nieobecny</div>
      <div class="legend__item">
        <span class="free"></span> - Obecny(gotowy do wyznaczenia)
      </div>
      <div class="legend__item">
        <span class="working"></span> - Obecny(wyznaczony)
      </div>
    </div>
    <div class="flex">
      <div v-if="attendants.length > 0" class="table-wrapper">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Imię i nazwisko</th>
              <th>obecny</th>
              <th>techniczny</th>
              <th>obrada</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="attendant in attendants"
              :key="attendant.key"
              :class="[
                attendant[selectedDay].reportedAbsence ? 'not-absent' : '',
                !attendant.agreement ? 'not-agreement' : '',
                !attendant[selectedDay].debate &&
                !attendant[selectedDay].technical &&
                attendant[selectedDay].absence &&
                attendant.agreement
                  ? 'free'
                  : '',
                (attendant[selectedDay].debate ||
                  attendant[selectedDay].technical) &&
                attendant[selectedDay].absence &&
                !attendant[selectedDay].reportedAbsence &&
                attendant.agreement
                  ? 'working'
                  : '',
              ]"
            >
              <td>
                <span v-if="attendant[selectedDay].reportedAbsence"
                  ><s>{{ attendant.name }}</s></span
                >
                <span v-else>{{ attendant.name }}</span>
              </td>
              <td>
                <div class="checkbox-wrapper">
                  <input
                    :id="attendant.key + 'absence'"
                    type="checkbox"
                    class="switch"
                    :checked="attendant[selectedDay].absence"
                    @change="setValue(attendant.key, 'absence', attendant)"
                    :disabled="attendant[selectedDay].reportedAbsence"
                  />
                </div>
              </td>
              <td>
                <div class="checkbox-wrapper">
                  <input
                    :id="attendant.key + 'technical'"
                    type="checkbox"
                    class="switch"
                    :checked="attendant[selectedDay].technical"
                    @change="setValue(attendant.key, 'technical', attendant)"
                    :disabled="
                      attendant[selectedDay].reportedAbsence ||
                      attendant[selectedDay].debate
                    "
                  />
                </div>
              </td>
              <td>
                <div class="checkbox-wrapper">
                  <input
                    :id="attendant.key + 'debate'"
                    type="checkbox"
                    class="switch"
                    :checked="attendant[selectedDay].debate"
                    @change="setValue(attendant.key, 'debate', attendant)"
                    :disabled="
                      attendant[selectedDay].reportedAbsence ||
                      attendant[selectedDay].technical
                    "
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="attendants.length === 0">
        Brak wyników. Pamietaj o wielkiej literze
      </div>
      <div class="stats card">
        <div class="card">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
              />
            </svg>
            Techniczni:
          </h3>
          <ol>
            <li v-for="x in technicalGuys" :key="x.key">{{ x.name }}</li>
          </ol>
        </div>
        <div class="card">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z"
              />
            </svg>
            Debatowcy:
          </h3>
          <ol>
            <li v-for="x in debateGuys" :key="x.key">{{ x.name }}</li>
          </ol>
        </div>
        <div class="card">
          <h4>Łącznie page : {{ attendants.length }}</h4>
          <h4>Zgody:</h4>
          <Pie :data="agreementsData" :options="options" />
        </div>
        <div class="card">
          <h4>Niebecności:</h4>
          <Pie :data="absenceData" :options="options" />
        </div>
        <div class="card">
          <h4>Podział prac:</h4>
          <Pie :data="workSplitData" :options="options" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import dbService from "../services/dbService.js";
import { useToast } from "vue-toastification";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import { Pie } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale);
const attendants = ref([]);
const toast = useToast();
const filterString = ref("");
const selectedDay = ref("th");
const summGuys = attendants.value.length;
const summAgreements = computed(() => {
  return attendants.value.filter((att) => att.agreement === true);
});
const summNotAgreements = computed(() => {
  return attendants.value.filter((att) => att.agreement === false);
});
const technicalGuys = computed(() => {
  return attendants.value.filter(
    (att) => att[selectedDay.value].technical === true
  );
});
const reportedAbsence = computed(() => {
  return attendants.value.filter(
    (att) => att[selectedDay.value].reportedAbsence === true
  );
});
const reportedNotAbsence = computed(() => {
  return attendants.value.filter(
    (att) => att[selectedDay.value].reportedAbsence === false
  );
});
const agreementsData = computed(() => {
  return {
    labels: ["Oddane zgody", "nieoddane"],
    datasets: [
      {
        backgroundColor: ["green", "gray"],
        data: [summAgreements.value.length, summNotAgreements.value.length],
      },
    ],
  };
});
const absenceData = computed(() => {
  return {
    labels: ["Zgłoszone niebecności", "Teoretyczna dyspozycja"],
    datasets: [
      {
        backgroundColor: ["gray", "green"],
        data: [reportedAbsence.value.length, reportedNotAbsence.value.length],
      },
    ],
  };
});
const workSplitData = computed(() => {
  return {
    labels: ["Techniczni", "Obradowcy"],
    datasets: [
      {
        backgroundColor: ["blue", "green"],
        data: [technicalGuys.value.length, debateGuys.value.length],
      },
    ],
  };
});
const options = {
  responsive: true,
};

const debateGuys = computed(() => {
  return attendants.value.filter(
    (att) => att[selectedDay.value].debate === true
  );
});
function onDataChange(items) {
  let _tutorials = [];

  items.forEach((item) => {
    let key = item.key;
    let data = item.val();
    _tutorials.push({
      key: key,
      name: data.name,
      agreement: data.agreement,
      th: data.th,
      fr: data.fr,
      sat: data.sat,
    });
  });

  attendants.value = _tutorials;
}
function filterResults() {
  dbService.getAll("name", filterString.value).on("value", onDataChange);
}
function setValue(key, field, currentObj) {
  currentObj[selectedDay.value][field] = event.target.checked;
  dbService
    .update(key, currentObj)
    .then(() => {
      toast.info("Pomyślnie zmieniono status!", {
        timeout: 3000,
      });
    })
    .catch((e) => {
      console.log(e);
    });
}
onMounted(() => {
  dbService.getAll("name", filterString.value).on("value", onDataChange);
});
</script>

<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 12px 0;
  input {
    width: fit-content;
  }
}
.flex {
  display: flex;
  gap: 36px;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.table-wrapper {
  overflow-x: scroll;
  @media (min-width: 768px) {
    min-width: 400px;
  }
}
.day-switcher {
  display: flex;
  gap: 16px;
  input[type="radio"] {
    display: none;
    &:checked + label {
      background: #405cf5;
      color: white;
    }
  }
  label {
    appearance: button;
    backface-visibility: hidden;
    background-color: white;
    border: 1px solid #405cf5;
    color: black;
    border-radius: 6px;
    border-width: 0;
    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
      rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
    box-sizing: border-box;
    cursor: pointer;
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue",
      Ubuntu, sans-serif;
    font-size: 100%;
    height: 44px;
    line-height: 1.15;
    margin: 5px 0 0;
    outline: none;
    overflow: hidden;
    padding: 0 25px;
    position: relative;
    text-align: center;
    text-transform: none;
    transform: translateZ(0);
    transition: all 0.2s, box-shadow 0.08s ease-in;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: fit-content;
    display: grid;
    place-content: center;
  }
}

.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  width: 100%;
}
.styled-table thead th {
  color: #ffffff;
}
.styled-table thead tr {
  background-color: #032854;
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
}
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #032854;
}
.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #032854;
}

.not-agreement {
  background: rgba(201, 201, 201, 0.4) !important;
}
.not-absent {
  background: rgb(153, 153, 153) !important;
}

.free {
  background: #bef0cb;
}
.working {
  background: #95bdff !important;
}
.legend {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
  &__item {
    display: flex;
    align-items: center;
    gap: 4px;
    span {
      width: 25px;
      height: 25px;
      display: block;
      border: 1px solid rgb(56, 56, 56);
      border-radius: 2px;
    }
  }
}
h3 {
  margin: 6px 0;
  svg {
    width: 24px;
  }
}
.stats {
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  canvas {
    height: 200px !important;
  }
}
</style>