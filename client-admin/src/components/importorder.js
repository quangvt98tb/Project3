import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';

export const ImportOrderList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="supplierId" />
            <TextField source="status" />
            <TextField source="subtotal" />
            <TextField source="createdAt" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const ImportOrderEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="supplierId" />
            <TextInput source="status" />
            <TextInput source="subtotal" />
            <TextInput source="createdAt" />
        </SimpleForm>
    </Edit>
);
export const ImportOderCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
        <TextInput source="status" />
        <TextInput source="subtotal" />
        <TextInput source="createdAt" />
        </SimpleForm>
    </Create>
);
