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
      add_todo: "ToDo追加",
      all_delete: "すべて削除",
    },
    statuses: {
      all: "すべて",
      work: "作業中",
      completed: "完了済み",
    },
    validations: {
      required: "{_field_}は必須項目です。",
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
    },
    statuses: {
      all: "All",
      work: "Work",
      completed: "Completed",
    },
    validations: {
      required: "{_field_} is required.",
    },
  },
} as const;
