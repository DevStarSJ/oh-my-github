import React, { PropTypes, Component, } from 'react'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import Tooltip from 'material-ui/lib/tooltip'

import SectionMostLovedLangs from './SectionMostLovedLangs'
import SectionOtherLangs from './SectionOtherLangs'

const mostLovedLangCount = 5

export const styles = {
  tabContent: {
    paddingTop: '30px',
    paddingBottom: '10px',
  },

  sectionTitle: {
    fontSize: '20px',
    fontWeight: 200,
  },

  containerProgressBar: {
  marginTop: '25px',
  marginBottom: '15px',
  },
}

class TabContentLanguage extends Component {

  render() {

    const { languages, } = this.props
    let repoLangs = languages
    let linePerLang = new Map()

    /** create Map<name, line> */
    for (let repoLang of repoLangs) {
      if (!(repoLang.languages === void 0))
        for(let lang of repoLang.languages) {
          if (linePerLang.get(lang.name) === void 0) linePerLang.set(lang.name, 0)

          linePerLang.set(lang.name, linePerLang.get(lang.name) + lang.line)
        }
    }

    /** create a sorted (by line) Array<{ name, line }> from Array<[name, line]> */
    let sortedRepoLangs = Array.from(linePerLang)
      .sort((a, b) => { return b[1] - a[1] /** order by desc (line) */ })
      .map(arraized => {
        return {name: arraized[0], line: arraized[1],}
      })

    const mostLovedLangs = sortedRepoLangs.slice(0, mostLovedLangCount)
    const otherLangs = sortedRepoLangs.slice(mostLovedLangCount)

    return (
      <div className='container' style={styles.tabContent} >
        <SectionMostLovedLangs mostLovedLangs={mostLovedLangs} />
        <SectionOtherLangs otherLangs={otherLangs} />
      </div>
    )
  }
}

export default TabContentLanguage

TabContentLanguage.propTypes = {
  languages: PropTypes.array.isRequired,
}