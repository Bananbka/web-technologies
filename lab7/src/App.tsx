import './App.css'
import {Wrapper} from "./components/Wrapper.tsx";
import {ContentCard} from "./components/ContentCard.tsx";
import {Table} from "./components/Table.tsx";
import {ContentCardHeader} from "./components/ContentCardHeader.tsx";
import {RegistrationForm} from "./components/RegistrationForm.tsx";
import {TagInput} from "./components/TagInput.tsx";


function App() {

    return (
        <Wrapper>
            <ContentCard flex={"row"}>
                <TagInput/>
            </ContentCard>

            <ContentCard flex={"col"}>
                <ContentCardHeader
                    cardHeadline={"Registration form"}
                    description={"Please fill in all fields."}
                />

                <RegistrationForm/>
            </ContentCard>

            <ContentCard flex={"col"}>
                <Table/>
            </ContentCard>

        </Wrapper>
    );
}

export default App;
