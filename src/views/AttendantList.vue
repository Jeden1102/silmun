<template>
  <div>
    <h2>Lista uczestników:</h2>
    *zaznacz checkbox, jeśli osoba zgłosiła nieobecność na dany dzień.
    <div class="search">
      <label for="">Wyszukaj</label>
      <input
        type="text"
        placeholder="Magdal..."
        @keyup="filterResults"
        v-model="filterString"
      />
    </div>
    <div v-if="attendants.length > 0" class="table-wrapper">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Imię i nazwisko</th>
            <th>czwartek</th>
            <th>piątek</th>
            <th>sobota</th>
            <th>akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="attendant in attendants" :key="attendant.key">
            <td>{{ attendant.name }}</td>
            <td>
              <div class="checkbox-wrapper">
                <input
                  :id="attendant.key + 'th'"
                  type="checkbox"
                  class="switch"
                  :checked="attendant.th.reportedAbsence"
                  @change="setAbsence(attendant.key, 'th', attendant)"
                />
              </div>
            </td>
            <td>
              <div class="checkbox-wrapper">
                <input
                  :id="attendant.key + 'fr'"
                  type="checkbox"
                  class="switch"
                  :checked="attendant.fr.reportedAbsence"
                  @change="setAbsence(attendant.key, 'fr', attendant)"
                />
              </div>
            </td>
            <td>
              <div class="checkbox-wrapper">
                <input
                  :id="attendant.key + 'sat'"
                  type="checkbox"
                  class="switch"
                  :checked="attendant.sat.reportedAbsence"
                  @change="setAbsence(attendant.key, 'sat', attendant)"
                />
              </div>
            </td>
            <td>
              <button @click="removePage(attendant.key)" class="danger">
                Usuń
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="attendants.length === 0">
      Brak wyników. Pamietaj o wielkiej literze
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import dbService from "../services/dbService.js";
import { useToast } from "vue-toastification";
const attendants = ref([]);
const filterString = ref("");
const toast = useToast();
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
function setAbsence(key, day, currentObj) {
  currentObj[day]["reportedAbsence"] = event.target.checked;
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
function removePage(key) {
  dbService
    .delete(key)
    .then(() => {
      toast.info("Pomyślnie usunięto page!", {
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
.table-wrapper {
  overflow-x: scroll;
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

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #032854;
}
.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #032854;
}
</style>