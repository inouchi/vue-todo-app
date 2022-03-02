<template>
  <v-dialog :value="showDialog" persistent max-width="300">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="clickAgree()">
          {{ $t("buttons.agree") }}
        </v-btn>
        <v-btn color="primary" text @click="clickDisagree()">
          {{ $t("buttons.disagree") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class ConfirmationDialog extends Vue {
  @Prop({ type: Boolean, required: true })
  showDialog!: boolean;

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: String, default: "" })
  message!: string;

  @Emit()
  clickAgree(): void {
    // No code required
  }

  @Emit()
  clickDisagree(): void {
    // No code required
  }
}
</script>

<style scoped></style>
