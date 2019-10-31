import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';

export const PromotionList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="uid" />
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="minus" />
            <TextField source="devide" />
            <TextField source="beginAt" />
            <TextField source="endAt" />
            <TextField source="createdAt" />
            <TextField source="updateAt" />
            <TextField source="enable" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const PromotionEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="uid" />
            <TextInput source="name" />
            <TextInput source="description" />
            <TextInput source="minus" />
            <TextInput source="devide" />
            <TextInput source="beginAt" />
            <TextInput source="endAt" />
            <TextInput source="createdAt" />
            <TextInput source="updateAt" />
            <TextInput source="enable" />
        </SimpleForm>
    </Edit>
);
export const PromotionCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <DisabledInput source="uid" />
            <TextInput source="name" />
            <TextInput source="description" />
            <TextInput source="minus" />
            <TextInput source="devide" />
            <TextInput source="beginAt" />
            <TextInput source="endAt" />
            <TextInput source="createdAt" />
            <TextInput source="updateAt" />
            <TextInput source="enable" />
        </SimpleForm>
    </Create>
);
