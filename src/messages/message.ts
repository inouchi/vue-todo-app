export const messages = {
  ja: {
    messages: {
      title: "タイトル",
      detail: "詳細",
      date: "日付",
      time: "時刻",
      status: "ステータス",
      search: "検索",
    },
    buttons: {
      add_todo: "タスク追加",
      all_delete: "すべて削除",
      agree: "はい",
      disagree: "いいえ",
    },
    statuses: {
      all: "すべて",
      work: "作業中",
      completed: "完了済み",
    },
    validations: {
      required: "{_field_}は必須項目です。",
    },
    dialogs: {
      titles: {
        delete: "削除確認",
      },
      messages: {
        delete: "全てのタスクを完全に削除します。実行してもよろしいでしょうか。",
      },
    },
  },
  en: {
    messages: {
      title: "Title",
      detail: "Detail",
      date: "Date",
      time: "Time",
      status: "Status",
      search: "Search",
    },
    buttons: {
      add_todo: "Add ToDo",
      all_delete: "All Delete",
      agree: "Agree",
      disagree: "Disagree",
    },
    statuses: {
      all: "All",
      work: "Work",
      completed: "Completed",
    },
    validations: {
      required: "{_field_} is required.",
    },
    dialogs: {
      titles: {
        delete: "Deletion Confirmation",
      },
      messages: {
        delete: "Completely delete all todo. May I execute it?",
      },
    },
  },
} as const;
