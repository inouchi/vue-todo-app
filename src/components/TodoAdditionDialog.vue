<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title>Add ToDo</v-card-title>
      <v-card-text>
        <v-row justify="center">
          <v-col>
            <v-text-field label="Title"></v-text-field>
            <v-textarea label="Detail"></v-textarea>
            <v-row>
              <v-col>
                <v-menu
                  v-model="showDatePicker"
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="showDatePicker = false"
                    :day-format="(date) => new Date(date).getDate()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  ref="timePicker"
                  v-model="showTimePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  persistent
                  :return-value.sync="time"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="mdi-clock-outline"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="showTimePicker"
                    v-model="time"
                    format="24hr"
                    @click:minute="$refs.timePicker.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" style="text-transform: none" @click="cancel()">
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" style="text-transform: none" @click="addTodo()">
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Todo } from "@/models/Todo";

@Component({})
export default class TodoAdditionDialog extends Vue {
  @Prop({ type: Boolean, default: false })
  showDialog!: boolean;

  showDatePicker = false;
  showTimePicker = false;

  cancel() {
    this.$emit("cancel");
  }

  add() {
    this.$emit("add");
  }
}
</script>

<style scoped></style>
