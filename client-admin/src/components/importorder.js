import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, ArrayInput, SimpleFormIterator,
        TextField, EditButton, DisabledInput, NumberInput, minValue, number,
        TextInput, ReferenceInput, SelectInput, ReferenceField, Filter, ArrayField } from 'react-admin';

const vaildatesNumber = [number('Nhập số'), minValue(0)]
const choices = [
    { status: 'Đã thanh toán'},
    { status: 'Chưa thanh toán' }
];
const ImportOrderFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Nhà cung cấp" reference="Suppliers" source="supplierId"  alwaysOn>
            <TextInput source="name" />
        </ReferenceInput>
    </Filter>
);

export const ImportOrderList = (props) => (
    <List title="Quản lý đơn nhập hàng" {...props} filters={<ImportOrderFilter />}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField  label="Nhà cung cấp" reference="Suppliers" source="supplierId">
                <TextField source="name" />
            </ReferenceField>
            <TextField label="Ngày nhập" source="createdAt" />
            <TextField label="Tổng giá" source="subtotal" />
            <TextField label="Trạng thái" source="status" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const ImportOrderEdit = (props) => (
    <Edit title="Thông tin chi tiết" {...props}>
        <SimpleForm>
            <ReferenceField label="Nhà cung cấp" reference="Suppliers" source="supplierId">
                <TextField source="name" />
            </ReferenceField>
            <ArrayField label="Danh sách sản phẩm" source="bookList">
                <Datagrid>
                    <ReferenceField  label="UID sách" reference="Books" source="bookId">
                        <TextField source="uid" />
                    </ReferenceField>
                    <ReferenceField  label="Tên sách" reference="Books" source="bookId">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField label="Số lượng" source="quantity" />
                    <TextField label="Giá" source="price" />
               </Datagrid>
            </ArrayField>
            <TextField label="Tổng giá" source="subtotal" />
            <TextField label="Ngày nhập" source="createdAt" />
            <TextField label="Trạng thái" source="status" />
        </SimpleForm>
    </Edit>
);
export const ImportOderCreate = (props) => (
    <Create title="Thêm đơn nhập hàng mới" {...props}>
        <SimpleForm>
        <ReferenceInput  label="Nhà cung cấp" reference="Suppliers" source="supplierId">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ArrayInput label="Danh sách sản phẩm" source="bookList">
            <SimpleFormIterator>
                <ReferenceInput  label="UID sách" reference="Books" source="bookId">
                    <SelectInput optionText="uid" />
                </ReferenceInput>
                {/* <ReferenceField  label="Tên sách" reference="Books" source="bookId">
                    <TextField source="name" />
                </ReferenceField> */}
                <TextInput label="Số lượng" source="quantity" validate={vaildatesNumber} />
                <TextInput label="Giá" source="price" validate={vaildatesNumber}/>
            </SimpleFormIterator>
        </ArrayInput>
        <SelectInput label="Trạng thái" source="status" choices={choices} optionText="status" optionValue="status" />
        <NumberInput label="Tổng giá" source="subtotal" validate={vaildatesNumber} />
        </SimpleForm>
    </Create>
);
