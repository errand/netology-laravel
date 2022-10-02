import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Todos(props) {
    const [sending, setSending] = useState(false);
    const [todoId, setTodoId] = useState(null);
    const [values, setValues] = useState({
        title: '',
        description: ''
    });

    const handleEditClick = ( e => {
        setSending(true);
        console.log(e);
    });

    const handleDeleteClick = ( id => {
        console.log(id)
        setSending(true);

        Inertia.delete(route('todos.destroy', id, {
            preserveState: true,
            onSuccess: (page) => {
                setSending(false);
            },
            onError: (errors) => {
                setSending(false);
            }
        }));
    });

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        setSending(true);

        Inertia.post(route('todos.store'), values, {
            onFinish: () => {
                setSending(false);
                evt.target.reset();
            }
        });
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            todos = {props.todos}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Todos</h2>}
        >
            <Head title="Todos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium text-gray-700">Title</label>
                                            <input type="text" name="title" id="title"
                                                   onChange={handleChange}
                                                   autoComplete="given-name"
                                                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="block text-sm font-medium text-gray-700">Description</label>
                                            <input type="text" name="description" id="description"
                                                   onChange={handleChange}
                                                   autoComplete="family-name"
                                                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button type="submit"
                                            onSubmit={() => handleSubmit(e)}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add
                                    </button>
                                </div>
                            </div>
                        </form>
                        <table className="table-auto w-full">
                            <tr>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Title</th>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Description</th>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Actions</th>
                            </tr>
                        {
                            props.todos.map(item =>
                                <tr key={item.id}>
                                    <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">{item.title}</td>
                                    <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">{item.description}</td>
                                    <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                        <button className="hello" onClick={ () => handleEditClick(item.id) }>Edit</button>
                                        <button onClick={ () => handleDeleteClick(item.id) }>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
