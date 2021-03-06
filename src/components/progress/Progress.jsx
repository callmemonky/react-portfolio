import React, {useState, useEffect,useRef} from 'react';
import styles from './Progress.module.css';
import {gsap,Power3,TweenLite} from 'gsap';

gsap.registerPlugin(TweenLite, Power3);

const Progress = (props) => {

    const [expand, setExpand] = useState(false);
    const [rotationTween, setRotationTween] = useState(TweenLite.to({},1,{paused: true}));
    const [roTween, setRoTween] = useState(TweenLite.to({},1,{paused: true}));

    let element2 = useRef(null); //tap to know ---> classname toggle two
    let element1 = useRef(null); // project details --=> classname toggle one
    let image1 = useRef(null);

    useEffect(() => {
        TweenLite.to(image1,1.2,{repeat:-1,rotation: 180, ease:Power3.easeInOut})

        setRotationTween(TweenLite.to([element2],0.5,{height: "0",opacity: 0,ease: Power3.easeInOut}).reverse()); //tap to know

        setRoTween(TweenLite.fromTo([element1],0.5,{height:0, display:"none"},{display:"block", height: "auto", opacity: 1, ease: Power3.easeInOut, delay: 0.2}).reverse()); //details valal

        console.log('called once')
      }, []);
    
      useEffect(() => {
          if(expand === true)
          {
              rotationTween.reversed(!expand); //tap to know
              setTimeout(() => { roTween.reversed(!expand); }, 500); //details vala
              console.log("Expand")
          }
          else
          {
              roTween.reversed(!expand);
              setTimeout(() => { rotationTween.reversed(!expand);}, 500);
              console.log("Not Expand")
          }
      }, [expand]);

    return ( 
        <div className={styles.container}>
            
            <div className={styles.inner}>
                <div className={styles.grid}>

                    <div className={styles.item}>
                        <div onClick={()=>setExpand(!expand)} className={styles.expand}>
                                <h1 className={styles.title}>{props.name}</h1>
                                
                                <div ref={el => {element2 = el}} className={styles.toggletwo}>
                                    <div className={styles.subtoggletwo}>
                                        <h2 className={styles.pretext}>Tap know more about it</h2>
                                        <img src="https://img.icons8.com/plasticine/24/000000/tap.png"/>
                                    </div>
                                </div> 

                                <div ref={el => {element1 = el}} className={styles.toggleone}>
                                    <h2 className={styles.tech}><span className={styles.techspan}>TechStack : </span>{props.tech}</h2>
                                    <h2 className={styles.techsub}>{props.des}</h2> 
                                    <div className={styles.linkbox}>
                                        <img ref={el=>{image1 = el}} src="https://img.icons8.com/ios-filled/20/000000/link.png"/>
                                        <a className={styles.techlink} href={`https://${props.url}`}>{props.url}</a>
                                    </div>   
                                </div>  
                                    
                            </div>
                    </div>

                    

                </div>
            
            </div>
        </div>
     );
}
 
export default Progress;