enum FieldTypes {
  text = 'text',
  password = 'password',
  email = 'email',
  number = 'number',
}

interface TableRow {
  [key: string]: string;
}

export { FieldTypes };

export type { TableRow };
