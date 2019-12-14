import React from 'react';
import { List, Datagrid, Create, SimpleForm, ArrayInput, SimpleFormIterator,ShowButton,Show,SimpleShowLayout,
        TextField, DisabledInput, NumberInput, minValue, number, required, DateField, DateInput,
        TextInput, ReferenceInput, SelectInput, ReferenceField, Filter, ArrayField, Edit } from 'react-admin';

const vaildatesNumber = [required('Không được bỏ trống!'), number('Nhập số'), minValue(0)]
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
            <TextField label="Ngày nhập" source="createdAt"/>
            <TextField label="Tổng giá" source="subtotal" />
            <ShowButton/>
        </Datagrid>
    </List>
);

export const ImportOrderShow = (props) => (
    <Show title="Thông tin chi tiết" {...props}>
        <SimpleShowLayout>
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
                    <TextField label="Giá nhập" source="price" />
               </Datagrid>
            </ArrayField>
            <TextField label="Tổng giá" source="subtotal" />
            <DateField label="Ngày nhập" source="createdAt" />
        </SimpleShowLayout>
    </Show>
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
                <TextInput label="Số lượng" source="quantity" validate={vaildatesNumber} />
                <TextInput label="Giá nhập" source="price" validate={vaildatesNumber} />
            </SimpleFormIterator>
        </ArrayInput>
        <DateInput label="Ngày nhập" source="createdAt" />
        <NumberInput label="Tổng giá" source="subtotal" validate={vaildatesNumber} />
        </SimpleForm>
    </Create>
);
