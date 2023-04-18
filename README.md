# Welome to React 18 Template

Purpose of this repository to unlock and visualize react 18 features including some popular compatible libraries such as:
- use of Context (Provider)
- materail-ui library mui v5: https://mui.com/
- react-router-dom v6: https://reactrouter.com/en/main
- redux toolkit: https://redux-toolkit.js.org/


[//]: # ()
[//]: # (## Pattern for Fetch and Render)

[//]: # ()
[//]: # (### Fetch-on-Render)

[//]: # ()
[//]: # (Traditionally fetch-on-render such as:)

[//]: # ()
[//]: # (```)

[//]: # (useEffect&#40;&#40;&#41; => {)

[//]: # (  fetchSomething&#40;&#41;.then&#40;setState&#41;;)

[//]: # (}, []&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (Leads to the waterfall problem if used in a hierarchy of components which results in adding the request times.)

[//]: # ()
[//]: # ()
[//]: # (Solution: bundle remote calls together &#40;if possible&#41;!)

[//]: # ()
[//]: # ()
[//]: # (### Fetch-Then-Render)
