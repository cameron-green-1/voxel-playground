import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { SplitText } from 'gsap/dist/SplitText';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function Home() {
    useEffect(() => {
        let scrollY = 0;
        const smoother = ScrollSmoother.create({
            wrapper: '.smooth-wrapper',
            content: '.smooth-content',
            smooth: 2,
            normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
            ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
            effects: true,
            preventDefault: true,
            onUpdate: (self) => {
                scrollY = self.scrollTop();
            },
        });

        const target = document.getElementById('move');
        const about = document.getElementById('about');
        // const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const pos = { x: 0, y: 0 };
        const mouse = { x: pos.x, y: pos.y };
        const speed = 0.05;
        const xSet = gsap.quickSetter(target, 'x', 'px');
        const ySet = gsap.quickSetter(target, 'y', 'px');
        let movementAllowed = false;

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        gsap.ticker.add(() => {
            // adjust speed for higher refresh monitors
            const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

            if (movementAllowed) {
                // pos.x += (mouse.x - (target.offsetLeft + 250) - pos.x) * dt;
                pos.x +=
                    (mouse.x -
                        (target.offsetLeft + target.offsetWidth / 2) -
                        pos.x) *
                    dt;
                // pos.y +=
                //     (mouse.y + scrollY - (target.offsetTop + 250) - pos.y) * dt;
                pos.y +=
                    (mouse.y +
                        scrollY -
                        (target.offsetTop + target.offsetHeight / 2) -
                        pos.y) *
                    dt;
                xSet(pos.x);
                ySet(pos.y);
            } else {
                pos.x += (0 - pos.x) * dt;
                pos.y += (0 - pos.y) * dt;
                xSet(pos.x);
                ySet(pos.y);
            }
        });
        gsap.to(target, {
            padding: '0 575',
            scrollTrigger: {
                duration: 0.1,
                trigger: intro,
                toggleActions: 'restart none none reverse',
                start: 'top top',
                // markers: true,
                onEnter: () => {
                    console.log('onEnter');
                    movementAllowed = true;
                },
                onEnterBack: () => {
                    console.log('onEnterBack');
                    movementAllowed = true;
                },
                onLeave: () => {
                    movementAllowed = false;
                },
                onLeaveBack: () => {
                    console.log('onLeaveBack');
                    movementAllowed = false;
                },
            },
        });
        const vid = document.getElementById('moveVideo');
        gsap.to(vid, {
            scale: 0.5,
            scrollTrigger: {
                duration: 0.1,
                trigger: intro,
                toggleActions: 'restart none none reverse',
                start: 'top top',
            },
        });
    }, []);
    return (
        <>
            <Head>
                <title>Playground</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='smooth-wrapper'>
                <div className='smooth-content'>
                    <div className={styles.wrapper}>
                        <main className={styles.main}>
                            <section className={styles.intro} id='intro'>
                                <h1>
                                    SMART
                                    <br />
                                    DEVELOPMENT_
                                </h1>
                                <div className={styles.move} id='move'>
                                    {/* <div /> */}
                                    <div>
                                        <video
                                            src='/2.webm'
                                            autoPlay
                                            loop
                                            muted
                                            id='moveVideo'
                                        />
                                    </div>
                                </div>
                                <div className={styles.about} id='about'>
                                    <h2>ABOUT</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Donec tincidunt
                                        suscipit neque, ac pretium est. In non
                                        elementum nisi. Proin iaculis arcu est,
                                        sit amet fringilla sapien auctor at.
                                        Morbi fermentum ut mauris sed porttitor.
                                        Mauris mollis viverra risus quis
                                        pulvinar. Aenean pretium ligula sed eros
                                        egestas volutpat. Nunc in porta est.
                                        Aliquam ut volutpat justo. Integer quam
                                        tortor, lacinia eget lacus non, semper
                                        imperdiet dolor. Sed lacinia dolor quis
                                        sem suscipit venenatis. Proin fermentum
                                        elit turpis, sit amet blandit diam
                                        tincidunt sollicitudin. Praesent luctus
                                        orci metus, sed vehicula mi maximus
                                        finibus. Pellentesque volutpat rhoncus
                                        tempor.
                                    </p>
                                </div>
                            </section>
                            <div className={styles.code}>
                                <h2>CODE</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Donec tincidunt suscipit
                                    neque, ac pretium est. In non elementum
                                    nisi. Proin iaculis arcu est, sit amet
                                    fringilla sapien auctor at. Morbi fermentum
                                    ut mauris sed porttitor. Mauris mollis
                                    viverra risus quis pulvinar. Aenean pretium
                                    ligula sed eros egestas volutpat. Nunc in
                                    porta est. Aliquam ut volutpat justo.
                                    Integer quam tortor, lacinia eget lacus non,
                                    semper imperdiet dolor. Sed lacinia dolor
                                    quis sem suscipit venenatis. Proin fermentum
                                    elit turpis, sit amet blandit diam tincidunt
                                    sollicitudin. Praesent luctus orci metus,
                                    sed vehicula mi maximus finibus.
                                    Pellentesque volutpat rhoncus tempor.
                                </p>
                                <p>
                                    Praesent fringilla, neque et ornare
                                    efficitur, sapien ex accumsan erat, eget
                                    placerat nisi elit sit amet lacus. Aliquam
                                    erat volutpat. Sed facilisis consectetur
                                    egestas. Sed varius pellentesque vulputate.
                                    Cras vitae lacinia nibh. Quisque eget semper
                                    dui. Ut congue sem non mollis vestibulum.
                                    Morbi vestibulum nisi orci, sit amet
                                    tincidunt leo eleifend ut. Cras vulputate
                                    faucibus vulputate. Donec consectetur, nulla
                                    vitae vestibulum porta, nulla nulla dictum
                                    odio, in aliquet lorem elit non dolor.
                                    Curabitur tincidunt varius sollicitudin.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Donec tincidunt suscipit
                                    neque, ac pretium est. In non elementum
                                    nisi. Proin iaculis arcu est, sit amet
                                    fringilla sapien auctor at. Morbi fermentum
                                    ut mauris sed porttitor. Mauris mollis
                                    viverra risus quis pulvinar. Aenean pretium
                                    ligula sed eros egestas volutpat. Nunc in
                                    porta est. Aliquam ut volutpat justo.
                                    Integer quam tortor, lacinia eget lacus non,
                                    semper imperdiet dolor. Sed lacinia dolor
                                    quis sem suscipit venenatis. Proin fermentum
                                    elit turpis, sit amet blandit diam tincidunt
                                    sollicitudin. Praesent luctus orci metus,
                                    sed vehicula mi maximus finibus.
                                    Pellentesque volutpat rhoncus tempor.
                                </p>
                                <p>
                                    Praesent fringilla, neque et ornare
                                    efficitur, sapien ex accumsan erat, eget
                                    placerat nisi elit sit amet lacus. Aliquam
                                    erat volutpat. Sed facilisis consectetur
                                    egestas. Sed varius pellentesque vulputate.
                                    Cras vitae lacinia nibh. Quisque eget semper
                                    dui. Ut congue sem non mollis vestibulum.
                                    Morbi vestibulum nisi orci, sit amet
                                    tincidunt leo eleifend ut. Cras vulputate
                                    faucibus vulputate. Donec consectetur, nulla
                                    vitae vestibulum porta, nulla nulla dictum
                                    odio, in aliquet lorem elit non dolor.
                                    Curabitur tincidunt varius sollicitudin.
                                </p>
                            </div>
                            {/* <section className={styles.vCenter}>
                        <div className={styles.parallaxSlab}>
                            <img
                                data-speed='auto'
                                src='https://assets.codepen.io/756881/smoothscroller-1.jpg'
                                alt=''
                            />
                        </div>
                    </section> */}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
