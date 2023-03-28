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
      <div class="stats card">Statystki danego dnia tutaj</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import dbService from "../services/dbService.js";
import { useToast } from "vue-toastification";

const attendants = ref([]);
const toast = useToast();
const filterString = ref("");
const selectedDay = ref("th");
function onDataChange(items) {
  let _tutorials = [];

  items.forEach((item) => {
    let key = item.key;
    let data = item.val();
    _tutorials.push({
      key: key,
      name: data.name,
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
.not-absent {
  background: rgba(201, 201, 201, 0.7) !important;
}
</style>