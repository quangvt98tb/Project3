import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, BooleanInput,
        TextField, EditButton, DisabledInput, NumberInput, minValue, number,
        TextInput, ReferenceInput, SelectInput, ReferenceField } from 'react-admin';

const vaildatesSubtotal = [number('Nhap dung la so'),minValue(0)]
export const ImportOrderList = (props) => (
    <List {...props}>
        <Datagrid>
            <ReferenceField  label="Supplier" reference="Suppliers" source="supplierId">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="status" />
            <TextField source="subtotal" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const ImportOrderEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceField  label="Supplier" reference="Suppliers" source="supplierId">
                <TextField source="name" />
            </ReferenceField>
            <TextInput source="status" />
            <NumberInput source="subtotal" validate={vaildatesSubtotal} />
        </SimpleForm>
    </Edit>
);
export const ImportOderCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
        <ReferenceInput  label="Supplier" reference="Suppliers" source="supplierId">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="status" />
        <NumberInput source="subtotal" validate={vaildatesSubtotal} />
        </SimpleForm>
    </Create>
);
