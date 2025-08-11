import { useEffect, useRef, FC, useState } from 'react';
import { Row, Card, Col, Pagination, PaginationProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import 'moment-timezone';
import { GetRealEstatesAsync } from './store/action';
import './index.less';
import { MySelect } from '@/components/basic';
import MyCard from '@/components/core/card';
import { DialogMethod } from '@/types/props/dialog.type';
import RealEstateFormDialog from '@/components/dialogs/estate-form';
import { RealEstateItem } from '@/interface/data/home.interface';

const CITY_KEYWORDS = [
  "Marietta", "Kennesaw", "Roswell", "Alpharetta", "Milton", "Sandy Springs", "Dunwoody", 
  "Buckhead", "Brookhaven", "Johns Creek", "Woodstock", "Vinings"
] as const;

const DAMAGE_KEYWORDS = [
  "storm damage","tree damage","water damage","fire damage","mold","asbestos","abatement",
  "mitigation","remediation","major repairs needed","repair","tear down","fixer-upper",
  "TLC","needs updates","renovation","insurance claim",
] as const;

const SALE_TYPE_KEYWORDS = [
  "as-is","sold as-is","cash only","investor special","flip opportunity","pre-foreclosure",
  "foreclosure","short sale","REO","probate","tax delinquent","absentee owner","vacant",
  "code violation","inheritance","divorce","needs TLC","investor special","not FHA eligible",
] as const;

const HomePage: FC = () => {
    const dispatch = useDispatch();
    const { data, total } = useSelector(s => s.homepage);

    const [ selectedCities, setSelectedCities ] = useState<string[]>([]);
    const [ selectedDamages, setSelectedDamages ] = useState<string[]>([]);
    const [ selectedSaletypes, setSelectedSaletypes ] = useState<string[]>([]);
    const [ current, setCurrent ] = useState<number>(1);

    const createDialogRef = useRef<DialogMethod<RealEstateItem>>(null);

    useEffect(() => {
        dispatch(GetRealEstatesAsync({cities: selectedCities, damage_tags: selectedDamages, saletype_tags: selectedSaletypes, page: current}));
    }, [ selectedCities, selectedDamages, selectedSaletypes, current ]);

    const handleClick = (item: RealEstateItem) => {
        createDialogRef.current?.open(item);
    }

    const handleChange = (current: number, size: number) => {
        setCurrent(current);
    }

    return (
        <>
            <Row><Col span={24}>
                <Card>
                    <div className='filters'>
                        <div>
                            City: 
                            <MySelect
                                mode="multiple"
                                placeholder="Select the target city"
                                options={CITY_KEYWORDS.map(key => ({label: key, value: key}))}
                                value={selectedCities}
                                onChange={val => setSelectedCities(val)}
                            />
                        </div>
                        <div>
                            Damage-related tags:
                            <MySelect
                                mode="multiple"
                                placeholder="Select damage-related"
                                options={DAMAGE_KEYWORDS.map(key => ({label: key, value: key}))}
                                value={selectedDamages}
                                onChange={val => setSelectedDamages(val)}
                            />
                        </div>
                        <div>
                            Sale Types:
                            <MySelect
                                mode="multiple"
                                placeholder="Select sale type"
                                options={SALE_TYPE_KEYWORDS.map(key => ({label: key, value: key}))}
                                value={selectedSaletypes}
                                onChange={val => setSelectedSaletypes(val)}
                            />
                        </div>
                    </div>
                </Card>
            </Col></Row>
            <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
                <Pagination
                    showSizeChanger={false}
                    defaultCurrent={1}
                    current={current}
                    total={total}
                    onChange={handleChange}
                    pageSize={24}
                />
            </div>
            <Row gutter={[6, 20]}>
                { data.map(item => (
                    <Col sm={24} md={12} lg={12} xl={8} xxl={6}>
                        <MyCard
                            item={item}
                            onClick={handleClick}
                        />
                    </Col>
                ))}
            </Row>
            <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
                <Pagination
                    showSizeChanger={false}
                    defaultCurrent={1}
                    current={current}
                    total={total}
                    onChange={handleChange}
                    pageSize={24}
                />
            </div>
            <RealEstateFormDialog onClose={() => {}} title='' ref={createDialogRef} />
        </>
    )
};

export default HomePage;
