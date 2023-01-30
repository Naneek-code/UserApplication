import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { deleteUsers, listUsers, registerUser, editUser } from "../../services/users";


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function () {
    const [users, setUsers] = useState([])
    const paperStyled = { padding: '30px 20px', width: 800, margin: '30px auto', display: 'flex', flexDirection: 'column' }
    const [email, setEmail] = useState('');
    const [userSelected, setUserSelected] = useState({})
    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);
    const getUser = async () => {
        const users = await listUsers()
        setUsers(users.data);
    }

    const handleOpen = () => setModal(true);
    const handleClose = () => setModal(false);

    const register = async () => {
        if (name === '' || email === '') return;
        const data = {
            nome: name,
            email: email
        }
        await registerUser(data)
        setName('')
        setEmail('')
        getUser()
    }

    const deleteUser = async (id) => {
        await deleteUsers(id);
        getUser();
    }

    const openModalEdit = (id, nome, email) => {
        handleOpen();
        setUserSelected({ id, nome, email })
    }

    const editar = async () => {

        const data = {
            id: userSelected.id,
            nome: userSelected.nome,
            email: userSelected.email
        }
        await editUser(userSelected.id, data);
        handleClose()
        getUser();
    }


    useEffect(() => {
        getUser()
    }, [])


    return (
        <>
            <Box>
                <Paper elevation={5} sx={paperStyled}>
                    <Box>CRUD<br /><em><strong>User</strong>Application</em></Box>
                    <br />
                    <Box display='flex' flexDirection={'row'} >
                        <TextField
                            fullWidth
                            label="Nome"
                            name="nome"
                            value={name}
                            sx={{ m: 1, width: '50%' }}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="E-mail"
                            name="email"
                            sx={{ m: 1, width: '50%' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ width: '15%', position: 'relative' }} left='670px'>
                        <Button color="primary" variant="contained" fullWidth onClick={(e) => register()}>Cadastrar</Button>
                    </Box>
                </Paper>
            </Box>

            <Box sx={{ width: '90%', margin: 'auto', }}>
                <Paper>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>E-mail</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.length > 0 && users.map((user) => (
                                    <StyledTableRow key={user.nome}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell component="th" scope="row">{user.nome}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell align="right"><Button color="primary" variant="contained" onClick={() => openModalEdit(user.id, user.nome, user.email)}>Editar</Button> <Button color="primary" variant="contained" onClick={() => deleteUser(user.id)}>Excluir</Button></TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
            <Modal
                open={modal}
                onClose={handleClose}
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Box display='flex' flexDirection={'row'} >
                            <TextField
                                fullWidth
                                label="Nome"
                                name="nome"
                                sx={{ m: 1, width: '50%' }}
                                value={userSelected.nome}
                                onChange={(e) => setUserSelected({ ...userSelected, nome: e.target.value })}
                            />
                            <TextField
                                label="E-mail"
                                name="email"
                                sx={{ m: 1, width: '50%' }}
                                value={userSelected.email}
                                onChange={(e) => setUserSelected({ ...userSelected, email: e.target.value })}
                            />
                        </Box>
                        <Box sx={{ width: '15%', position: 'relative' }} left='670px'>
                            <Button color="primary" variant="contained" fullWidth onClick={(e) => editar()}>Editar</Button>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}