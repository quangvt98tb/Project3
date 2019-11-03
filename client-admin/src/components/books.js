import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, 
        EditButton, DisabledInput, TextInput, ReferenceField , ReferenceInput, SingleFieldList,
        LongTextInput, DateInput, SelectInput, ChipField} from 'react-admin';


export const BookList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <ReferenceField  label="category" reference="Categories" source="categoryId">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="description" />
            <TextField label="Image URL" source="imgURL" />
            <TextField source="publisher" />
            <TextField source="author" />
            <TextField source="quantity" />
            <TextField label="Price" source="sellPrice" />
            <DateField label="Publish at" source="publishedAt" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const BookEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput   label="Category" reference="Categories" source="categoryId">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <LongTextInput source="description" />
            <TextInput label="Image URL" source="imgURL" />
            <TextInput source="publisher" />
            <TextInput source="author" />
            <TextInput source="quantity" />
            <TextInput label="Price" source="sellPrice" />
            <DateInput label="Publish at" source="publishedAt" />
        </SimpleForm>
    </Edit>
);
export const BookCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput   label="Category" reference="Categories" source="categoryId">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="description" />
            <TextInput label="Image URL" source="imgURL" />
            <TextInput source="publisher" />
            <TextInput source="author" />
            <TextInput source="quantity" />
            <TextInput label="Price" source="sellPrice" />
            <DateInput label="Publish at" source="publishedAt" />
        </SimpleForm>
    </Create>
);
