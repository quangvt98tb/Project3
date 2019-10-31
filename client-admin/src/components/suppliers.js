import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';

export const SuppliersList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="uid" />
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="address" />
            <TextField source="phone" />
            <TextField source="createAt" />
            <TextField source="id" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const SuppliersEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="uid" />
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="address" />
            <TextField source="phone" />
            <DisabledInput source="createAt" />
            <DisabledInput source="id" />
        </SimpleForm>
    </Edit>
);
export const SuppliersCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="uid" />
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="address" />
            <TextInput source="phone" />
            <DateInput source="createAt" />
        </SimpleForm>
    </Create>
);
