
import styles from './index.module.css';

export default function TestColorsPage() {

  return (
    <div className={ styles.overallContainer }>
      <h1 className={ styles.pageTitle }>Color Palette</h1>
      <div className={ styles.contentContainer }>
        <section className={ styles.section }>
          <h2 className={ styles.sectionTitle }>Surfaces</h2>
          <div className={ styles.palette }>
            <div className={ `${styles.colorSquare} ${styles.surface1}` }>
              1
            </div>
            <div className={ `${styles.colorSquare} ${styles.surface2}` }>
              2
            </div>
            <div className={ `${styles.colorSquare} ${styles.surface3}` }>
              3
            </div>
            <div className={ `${styles.colorSquare} ${styles.surface4}` }>
              4
            </div>
          </div>
        </section>
        <section className={ styles.section }>
          <h2 className={ styles.sectionTitle }>Primaries</h2>
          <div className={ styles.palette }>
            <div className={ `${styles.colorSquare} ${styles.primaryDark}` }>
              dark
            </div>
            <div className={ `${styles.colorSquare} ${styles.primaryBase}` }>
              base
            </div>
            <div className={ `${styles.colorSquare} ${styles.primaryLight}` }>
              light
            </div>
          </div>
        </section>
        <section className={ styles.section }>
          <h2 className={ styles.sectionTitle }>Status</h2>
          <div className={ styles.palette }>
            <div className={ `${styles.colorSquare} ${styles.okBase}` }>
              ok - base
            </div>
            <div className={ `${styles.colorSquare} ${styles.warnBase}` }>
              warn - base
            </div>
            <div className={ `${styles.colorSquare} ${styles.errorBase}` }>
              error - base
            </div>
            <div className={ `${styles.colorSquare} ${styles.okLight}` }>
              ok - light
            </div>
            <div className={ `${styles.colorSquare} ${styles.warnLight}` }>
              warn - light
            </div>
            <div className={ `${styles.colorSquare} ${styles.errorLight}` }>
              error - light
            </div>
          </div>
        </section>
        <section className={ styles.section }>
          <h2 className={ styles.sectionTitle }>Monotones</h2>
          <div className={ styles.palette }>
            <div className={ `${styles.colorSquare} ${styles.monoDarkest}` }>
              darkest
            </div>
            <div className={ `${styles.colorSquare} ${styles.monoDarker}` }>
              darker
            </div>
            <div className={ `${styles.colorSquare} ${styles.monoDark}` }>
              dark
            </div>
            <div className={ `${styles.colorSquare} ${styles.monoBase}` }>
              base
            </div>
            <div className={ `${styles.colorSquare} ${styles.monoLight}` }>
              light
            </div>
            <div className={ `${styles.colorSquare} ${styles.monoLighter}` }>
              lighter
            </div>
            <div className={ `${styles.colorSquare} ${styles.monoLightest}` }>
              lightest
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}