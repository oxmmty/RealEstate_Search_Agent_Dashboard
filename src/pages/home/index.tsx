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
  "repair",
  "fixer-upper",
  "damage",
  "insurance claim",
  "mitigation",
  "renovate",
  "restoration",
  "storm damage",
  "water damage",
  "tree damage",
  "fire damage",
  "mold",
  "asbestos",
  "TLC"
];

const SALE_TYPE_KEYWORDS = [
  "as-is",
  "foreclosure",
  "pre-foreclosure",
  "short sale",
  "lien",
  "tax delinquent",
  "divorce",
  "bankruptcy",
  "probate",
  "off market",
  "inheritance",
  "flip"
];

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
                    <Row gutter={[10, 10]}>
                        <Col md={8} xs={24}>
                            <MySelect
                                placeholder="Select the target city"
                                options={CITY_KEYWORDS.map(key => ({label: key, value: key}))}
                                value={selectedCities}
                                title="City"
                                onChange={val => setSelectedCities(val)}
                            />
                        </Col>
                        <Col md={8} xs={24}>
                            <MySelect
                                placeholder="Select damage-related"
                                options={DAMAGE_KEYWORDS.map(key => ({label: key, value: key}))}
                                value={selectedDamages}
                                title='Damage-related tags'
                                onChange={val => setSelectedDamages(val)}
                            />
                        </Col>
                        <Col md={8} xs={24}>
                            <MySelect
                                placeholder="Select sale type"
                                options={SALE_TYPE_KEYWORDS.map(key => ({label: key, value: key}))}
                                value={selectedSaletypes}
                                title='Sale Types'
                                onChange={val => setSelectedSaletypes(val)}
                            />
                        </Col>
                    </Row>
                </Card>
            </Col></Row>
            <div style={{marginTop: '30px'}}>
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
                { total > 0 &&
                    <Pagination
                        showSizeChanger={false}
                        defaultCurrent={1}
                        current={current}
                        total={total}
                        onChange={handleChange}
                        pageSize={24}
                    />
                }
            </div>
            <RealEstateFormDialog onClose={() => {}} title='' ref={createDialogRef} />
        </>
    )
};

export default HomePage;
