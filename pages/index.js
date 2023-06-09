import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/header';
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
        const intro = document.getElementById('intro');
        console.log(intro.offsetTop);
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
                pos.x +=
                    (mouse.x -
                        (target.offsetLeft + target.offsetWidth / 2) -
                        pos.x) *
                    dt;
                // need to offset by the section's top coordinate as otherwise yPos breaks when isn't at the very top
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
            scrollTrigger: {
                duration: 0.1,
                trigger: intro,
                toggleActions: 'restart none none reverse',
                start: '30% top',
                markers: true,
                onEnter: () => {
                    console.log('onEnter');
                    movementAllowed = true;
                    target.classList.add('paddingNew');
                },
                onEnterBack: () => {
                    console.log('onEnterBack');
                    movementAllowed = true;
                    target.classList.add('paddingNew');
                },
                onLeave: () => {
                    movementAllowed = false;
                    target.classList.remove('paddingNew');
                },
                onLeaveBack: () => {
                    console.log('onLeaveBack');
                    movementAllowed = false;
                    target.classList.remove('paddingNew');
                },
            },
        });
        const vid = document.getElementById('moveVideo');
        gsap.to(vid, {
            width: 300,
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
            <Header />
            <div className='smooth-wrapper'>
                <div className='smooth-content'>
                    <div className={styles.wrapper}>
                        <main className={styles.main}>
                            <section className={styles.cover}>
                                <h1>
                                    Building standout experiences for events,
                                    exhibitions and retail spaces.
                                </h1>
                            </section>
                            <section className={styles.intro} id='intro'>
                                <div className='tight'>
                                    <h2>
                                        We create 🧪
                                        <br />
                                        moving experiences 🕹
                                    </h2>
                                    <div className={styles.move} id='move'>
                                        <div id='videoContainer'>
                                            <video
                                                src='/1.webm'
                                                autoPlay
                                                loop
                                                muted
                                                id='moveVideo'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.about} id='about'>
                                    <div className='tight'>
                                        <h3>About</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Donec
                                            tincidunt suscipit neque, ac pretium
                                            est. In non elementum nisi. Proin
                                            iaculis arcu est, sit amet fringilla
                                            sapien auctor at. Morbi fermentum ut
                                            mauris sed porttitor. Mauris mollis
                                            viverra risus quis pulvinar. Aenean
                                            pretium ligula sed eros egestas
                                            volutpat. Nunc in porta est. Aliquam
                                            ut volutpat justo. Integer quam
                                            tortor, lacinia eget lacus non,
                                            semper imperdiet dolor. Sed lacinia
                                            dolor quis sem suscipit venenatis.
                                            Proin fermentum elit turpis, sit
                                            amet blandit diam tincidunt
                                            sollicitudin. Praesent luctus orci
                                            metus, sed vehicula mi maximus
                                            finibus. Pellentesque volutpat
                                            rhoncus tempor.
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section className={styles.labs}>
                                <h5>/who-we-are</h5>
                                <p>
                                    We are <span>creative</span> and{' '}
                                    <span>strategic</span> thinkers,
                                </p>
                                <p style={{ marginBottom: 20 }}>
                                    building for the <span>metaverse.</span>
                                </p>
                                <p>
                                    We help brands to explore new playgrounds,
                                </p>
                                <p>
                                    connect with <span>communities</span> and
                                    craft
                                </p>
                                <p style={{ marginBottom: 40 }}>
                                    cool <span>experiences.</span>
                                </p>
                                <button>Contact us</button>
                            </section>
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
