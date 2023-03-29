<template>
  <div class="add__attendant card">
    <label for="">Dodaj uczestnika</label>
    <input placeholder="Jan Kowalski" v-model="attendantName" type="text" />
    <button @click="addAttendant">Dodaj</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dbService from "../services/dbService.js";
import { useToast } from "vue-toastification";

const attendantName = ref("");
const emit = defineEmits(["refreshList"]);
const toast = useToast();
function addAttendant() {
  const attendants = attendantName.value.split(";");
  attendants.forEach((attendant) => {
    const attendantObj = {
      name: attendant,
      agreement: false,
      th: {
        absence: false,
        reportedAbsence: false,
        debate: false,
        technical: false,
      },
      fr: {
        absence: false,
        reportedAbsence: false,
        debate: false,
        technical: false,
      },
      sat: {
        absence: false,
        reportedAbsence: false,
        debate: false,
        technical: false,
      },
    };
    dbService
      .create(attendantObj)
      .then(() => {
        toast.info("Page dodany pomyślnie!", {
          timeout: 3000,
        });
      })
      .catch((e: any) => {});
  });
  attendantName.value = "";
}
</script>

<style >
.card {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.17);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
}
.add__attendant {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

<!-- Hanna Kowalczyk;Sabina Ożóg;Alicja Borkowska;Hanna Marcinowska;Julia Pawleta;Adriana Dworak;Oskar Konieczny;Anna Paruszewska;Alicja Pieniążek;Zuzanna Kazek;Kornelia Pawełczuk;Maja Ryniak;Magdalena Konik;Weronika Bienias;Emilia Hanko;Malwina Makara;Kaja Wojtas;Anna Kowalczyk;Oliwia Boska;Julia Wąsiak;Maria Olchowy;Paulina Spychała;Ewa Siłka;Wojciech Janicki;Ola Zima;Anna Kodura;Wiktoria;Kopczewska;Karolina Hajbura;Agata Twardochleb;Wiktoria Felusiak;Kaja Fiedeń;Hanna Gorczyńska;Wojciech Okuniewicz;Olga Borosz;Jasmine Duda;Marta Popów;Oliwier Gotwald;Hanna Stachurska;Mateusz Nieckarz;Zuzanna Bernacka;Daria Perkowska -->