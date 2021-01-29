import classes from './profile_info.module.css'
import {reduxForm, Field} from 'redux-form';
import {ChangeEvent, useState} from 'react';
import {Input, InfoDesk} from './../../../others/validate_textarea/validate_textarea';
import {change_status_val, MaxLength300} from './../../../../utils/validators/validaor';
import React from 'react';

const ProfileInfoForm = function (props: any) {
    let file: null;

    function add_image(event: any) {
        if (event.target.files.length) {
            file = event.target.files[0]
        }
    }

    function save_image() {
        if (file) {
            props.addImage(file)
        }
    }

    function cancel(event: ChangeEvent) {
        props.animateMain()
        setTimeout(props.activate, 2000)
        event.preventDefault()
    }

    return (
        <form onSubmit={props.handleSubmit} className={classes.main}>
            <div className={classes.mainBlock}>
                <div className={classes.nameAndDescBlock}>
                    <div className={classes.nameBlock}>
                        <h2 className={classes.h2Name}>Name: </h2>
                        <Field type='text' component={Input} name={'fullName'}
                               placeholder={'Change name...'} validate={change_status_val}
                               className={classes.fullName}
                               autoComplete="off"></Field>
                    </div>
                    <div className={classes.descriptionBlock + ' ' + classes.nameBlock}>
                        <h4 className={classes.h2Name}>Description:</h4>
                        <Field type={'text'} component={InfoDesk}
                               name={'desk'}
                               placeholder={'description...'} maxLength='300' validate={MaxLength300} autoComplete="off"
                               className={classes.fullName + ' ' + classes.deskArea}/>
                    </div>
                </div>
                <div className={classes.imageBlock}>
                    <img src={props.userImage} alt="" className={classes.userImage}/>
                    <div className={classes.addImageButton}>
                        <span className={classes.addImageTitle}>Change</span>
                        <input type='file' name='image' onChange={add_image} className={classes.addImageHidden}
                               title={''}/>
                    </div>
                </div>
            </div>
            <div className={classes.saveOrCancelBlock}>
                <button onClick={save_image} className={classes.save}>Save</button>
                {/*@ts-ignore*/}
                <button onClick={cancel} className={classes.cancel}>Cancel</button>
            </div>
        </form>
    )


}


type Props = {
    activate: Function
    changeProfile: Function
    updateStatus: Function
    addImage: Function
    profile: any
    userId: number
    userImage: string
}


const ProfileInfo: React.FC<Props> = function (props) {
    let [animate, openAnimate] = useState(false)
    let animateMain = () => {
        openAnimate(!animate)
    }
    let activate = (data: any) => {
        type testType = {
            userId: number | null
            lookingForAJob: boolean
            LookingForAJobDescription: string
            fullName: string
            aboutMe: string
            contacts: any
        }
        let test: testType = {
            userId: props.userId,
            lookingForAJob: data.lok_for_job || false,
            LookingForAJobDescription: '___',
            fullName: data.fullName,
            aboutMe: '_',
            contacts: {
                github: data.git || null,
                vk: data.vk || null,
                facebook: data.facebook || null,
                instagram: data.instagram || null,
                twitter: data.twitter || null,
                website: data.website || null,
                youtube: data.youtube || null,
                mainLink: data.mainLink || null,
            }
        }
        animateMain()

        setTimeout(() => {
            props.changeProfile(test, props.profile)
            props.activate()
            props.updateStatus(data.desk)
        }, 2000)

    }
    return (
        <div className={animate ? classes.animateMain : classes.edit}>
            <h2 className={classes.title}>Edit</h2>
            {/*@ts-ignore*/}
            <ProfileInfoFormContainer onSubmit={activate} addImage={props.addImage} activate={props.activate}
                                      userImage={props.userImage} animateMain={animateMain}/>
        </div>
    )

}


const ProfileInfoFormContainer = reduxForm({
    form: 'profile_info_form'
})(ProfileInfoForm)


export default ProfileInfo