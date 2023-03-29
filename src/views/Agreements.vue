<template>
  <div>
    <h2>Zgodny:</h2>
    *zaznacz checkbox, jeśli osoba oddała zgodę uczestnictwa.
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
            <th>zgoda</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="attendant in attendants" :key="attendant.key">
            <td>{{ attendant.name }}</td>
            <td>
              <div class="checkbox-wrapper">
                <input
                  :id="attendant.key + 'agreement'"
                  type="checkbox"
                  class="switch"
                  :checked="attendant.agreement"
                  @change="setAgreement(attendant.key, attendant)"
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
function setAgreement(key, currentObj) {
  currentObj.agreement = event.target.checked;
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
  padding: 8px 10px;
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