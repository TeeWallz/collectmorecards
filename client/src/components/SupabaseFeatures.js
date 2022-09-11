import { useRef, useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'
import { Google_Button_SignIn, Github_Button_SignIn, Email_Button_SignIn } from './LoginButtons'
import { supabase } from '../supabase'

import './SupabaseFeatures.css'

export function SupabaseFeatures() {
    // Addition feature state
    const number1Ref = useRef()
    const number2Ref = useRef()
    const answerRef = useRef()

    // Message feature state
    // Current messages
    let [messages, setMessages] = useState([])
    // New message field
    const newMessageRef = useRef()
    // Message recieved from API via listener
    const [newMessageFromListener, handleNewMessageFromListener] = useState(null)
    const editMessageRef = useRef()
    let [editMessageId, setEditMessageId] = useState(null)

    const [editMessage, setEditMessage, editMessageInput] = useInput({ type: "text" });


    // Get signUp function from the auth context
    const { user, update } = useAuth()
    const history = useHistory()



    // Add Feature Stuff
    async function handleAddSubmit(e) {
        e.preventDefault()

        let number1 = number1Ref.current.value
        let number2 = number2Ref.current.value
        if (!(number1)) { alert('Number 1 empty.'); return; }
        if (!(number2)) { alert('Number 2 empty.'); return; }

        let { data, error } = await supabase
            .rpc('add', {
                i: number1,
                j: number2,
            })

        if (error) console.error(error)
        else console.log(data)

        answerRef.current.value = data
    }





    ///////////////////////////////////////////////////////
    /////////////////// MESSAGE STUFF /////////////////////
    ///////////////////////////////////////////////////////


    // On load, reload all messages
    async function getMessages() {
        let { data: message_data, error } = await supabase
            .from('messages')
            .select('*')

        // setMessages(message_data.reduce((obj, item) => Object.assign(obj, { [item.message_id]: item }), {}))
        setMessages(message_data)
    }

    // Listen for new messages, and use handleNewMessageFromListener/newMessageFromListener to recieve the update
    useEffect(() => {
        getMessages();

        const messageListener = supabase
            .from('messages')
            .on('*', (payload) => handleNewMessageFromListener(payload))
            .subscribe();
        let kek = 1;
    }, []);

    // Listen for a new message in handleNewMessageFromListener
    useEffect(() => {
        if (newMessageFromListener) {
            const handleAsync = async () => {
                // let authorId = newMessage.user_id
                let messages_copy = messages;
                switch (newMessageFromListener.eventType) {
                    case 'INSERT':
                        messages_copy = [...messages_copy, ...[newMessageFromListener.new]]
                        break;
                    case 'DELETE':
                        for (var i = messages_copy.length - 1; i >= 0; i--) {
                            if (messages_copy[i].message_id === newMessageFromListener.old.message_id) {
                                messages_copy.splice(i, 1);
                            }
                        }
                        break;
                    case 'UPDATE':
                        for (var i = messages_copy.length - 1; i >= 0; i--) {
                            if (messages_copy[i].message_id === newMessageFromListener.new.message_id) {
                                messages_copy[i] = newMessageFromListener.new
                            }
                        }
                        break;
                    default:
                        break
                }
                setMessages([...messages_copy])
            }
            handleAsync()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newMessageFromListener])

    async function deleteMessageButton(e) {
        const { data, error } = await supabase
            .from('messages')
            .delete()
            .eq('message_id', e.target.dataset.key)
    }

    function findMessage(id) {
        for (var i = messages.length - 1; i >= 0; i--) {
            if (messages[i].message_id === id) {
                return messages[i];
            }
        }
        return null;
    }

    function editMessageButton(e) {
        setEditMessageId(e.target.dataset.key);
        // editMessageRef.current.value = findMessage(e.target.dataset.key).message;
        setEditMessage(findMessage(e.target.dataset.key).message)
    }

    async function saveMessageButton(e) {
        if (!(editMessage)) { alert('Message empty.'); return; }

        let edited_message = findMessage(editMessageId);
        edited_message.message = editMessage

        const { data, error } = await supabase
            .from('messages')
            .upsert(edited_message);

        setEditMessageId(null);
        setEditMessage(null);
        if (error) console.error(error)
        else console.log(data)
    }


    async function handleMessageSubmit(e) {
        e.preventDefault();

        let newMessage = newMessageRef.current.value
        if (!(newMessage)) { alert('Message empty.'); return; }

        const { data, error } = await supabase
            .from('messages')
            .insert([
                { message: newMessage },
            ])

        if (error) console.error(error)
        else console.log(data)


    }



    ///////////////////////////////////////////////////////
    ////////////////////// FILE STUFF /////////////////////
    ///////////////////////////////////////////////////////
    async function handlAvatarSubmit(e) {
        e.preventDefault();

        // let newMessage = newMessageRef.current.value
        if (!(e.target.file.files[0])) { alert('File empty.'); return; }
        console.log(e.target.file.files[0])
        let ass = user;
        const avatarFile = e.target.file.files[0];
        const extenstion = avatarFile.name.split('.').pop();
        const filepath = `${user.id}.${extenstion}`;

        const { data, error } = await supabase.storage
            .from('avatars')
            .upload(filepath, avatarFile, {
                upsert: true
            })

        if (error) { console.error(error); return; }
        else console.log(data)

        const { publicURL, urlError } = supabase.storage
            .from('avatars')
            .getPublicUrl(filepath)
        console.log({ publicURL, error })
        if (urlError) { console.error(urlError); return; }
        else console.log(publicURL)

        let avatar_url = publicURL;

        const { userData, userError } = await update({ avatar_url })
        console.log({ userData, userError })
        console.log({ user })

    }



    function useInput({ type /*...*/ }) {
        const [value, setValue] = useState("");
        const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
        return [value, setValue, input];
    }



    return (
        <>
            <h2>Addition Postgres Function API</h2>
            <form onSubmit={handleAddSubmit}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <label htmlFor="input-email">Number 1</label>
                        <input id="input-number1" type="number" ref={number1Ref} style={{ width: '150px' }} autoComplete="none" />
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <label htmlFor="input-email" >Number 2</label>
                        <input id="input-number2" type="number" ref={number2Ref} style={{ width: '150px' }} />
                    </div>
                    <div style={{ marginLeft: '20px', paddingTop: '55px' }}>
                        =
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <label htmlFor="input-email" >Answer from Server</label>
                        <input id="input-result" type="number" ref={answerRef} style={{ width: '150px' }} />
                    </div>
                </div>

                <br />

                <button type="submit">Add!</button>
                <br />
            </form>

            <h2>Messages</h2>
            <form onSubmit={handleMessageSubmit}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <label htmlFor="input-message">New Message</label>
                        <input id="input-message" type="text" ref={newMessageRef} style={{ width: '600px' }} autoComplete="none" />
                    </div>
                </div>

                <button type="submit">Submit New Message</button>
                <br />
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', borderColor: '#2196F3', borderLeft: '6px solid #ccc', backgroundColor: '#ddffff', gap: '10px', padding: '10px' }}>
                {
                    Object.entries(messages).map(([idx, value]) => (
                        <div className='flex-container' style={{ backgroundColor: 'lavenderblush', }} key={value.message_id} data-key={value.message_id}>
                            <div className='flex-item_one' >
                                <div>{value.message_id}</div>
                                {value.message_id === editMessageId ? (
                                    <>
                                        {editMessageInput}
                                    </>
                                ) : (
                                    <div>{value.message}</div>
                                )}


                                <div>{value.updated_at}</div>
                            </div>
                            <div className='flex-item_two' >
                                {value.message_id === editMessageId ? (
                                    <div className='save_box' onClick={saveMessageButton} data-key={value.message_id}>
                                        Save
                                    </div>
                                ) : (
                                    <div className='edit_box' onClick={editMessageButton} data-key={value.message_id}>
                                        Edit
                                    </div>
                                )}

                            </div>
                            <div className='flex-item_two' >
                                <div className='x_box' onClick={deleteMessageButton} data-key={value.message_id}>
                                    x
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

            <h2>Files</h2>
            <form onSubmit={handlAvatarSubmit}>
                <input type="file" name="file" />
                <div>
                    <button type="submit">Upload Avatar</button>
                </div>
            </form>
        </>
    )

}

